import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parse } from "yaml"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const sourceRoot = path.resolve(projectRoot, process.argv[2] ?? "../wiki_data")
const contentRoot = path.join(projectRoot, "content")
const ignoredDirectories = new Set([
  ".git",
  ".obsidian",
  ".trash",
  "10. Raw 자료",
  "90. 템플릿",
  "99. 초안",
])

function readFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  return match ? (parse(match[1]) ?? {}) : {}
}

async function collectFiles(directory, relativeDirectory = "") {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) continue

    const absolutePath = path.join(directory, entry.name)
    const relativePath = path.join(relativeDirectory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath, relativePath)))
    } else {
      files.push({ absolutePath, relativePath })
    }
  }

  return files
}

async function copyPublishedNotes() {
  const sourceFiles = await collectFiles(sourceRoot)
  const markdownFiles = sourceFiles.filter(({ relativePath }) => relativePath.endsWith(".md"))
  const assetFiles = sourceFiles.filter(({ relativePath }) => !relativePath.endsWith(".md"))
  const publishedNotes = []
  const referencedAssets = new Set()

  for (const file of markdownFiles) {
    if (path.basename(file.relativePath) === "AGENTS.md") continue

    const markdown = await fs.readFile(file.absolutePath, "utf8")
    const frontmatter = readFrontmatter(markdown)
    if (frontmatter.publish !== true || frontmatter.draft === true) continue

    publishedNotes.push({ ...file, markdown })

    for (const match of markdown.matchAll(/!\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) {
      referencedAssets.add(path.basename(match[1]).normalize("NFC"))
    }
    for (const match of markdown.matchAll(/!\[[^\]]*\]\((?!https?:\/\/)([^)]+)\)/g)) {
      referencedAssets.add(
        path.basename(decodeURIComponent(match[1].split("#")[0])).normalize("NFC"),
      )
    }
  }

  await fs.rm(contentRoot, { recursive: true, force: true })
  await fs.mkdir(contentRoot, { recursive: true })

  for (const file of publishedNotes) {
    const destination = path.join(contentRoot, file.relativePath)
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await fs.writeFile(destination, file.markdown)
  }

  let copiedAssets = 0
  for (const file of assetFiles) {
    if (!referencedAssets.has(path.basename(file.relativePath).normalize("NFC"))) continue
    const destination = path.join(contentRoot, file.relativePath)
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await fs.copyFile(file.absolutePath, destination)
    copiedAssets += 1
  }

  console.log(
    `Synced ${publishedNotes.length} published notes and ${copiedAssets} referenced assets.`,
  )
}

await copyPublishedNotes()
