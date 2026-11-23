# How to add a new project

Each project is one folder inside `projects/`. The site builds the project card and the full
project page from that folder automatically. You never edit HTML.

## Steps

1. **Copy the template.** In `projects/`, copy the `_TEMPLATE` folder and paste it in the same place.

2. **Rename the copy.** Use lowercase letters and dashes, with no spaces. The name becomes the web address.
   `projects/rc-plane-wing/` → `yoursite.github.io/projects/rc-plane-wing/`

3. **Fill in `index.md`.** Open it in any text editor (VS Code or Notepad):
   - Edit the settings between the two `---` lines: `title`, `summary`, `tags`, `date`, `role`, `tools`.
   - Write your sections below them: **Overview**, **Process**, **Results**. You can add more `## Headings` if you need them.

4. **Add your images.**
   | Image | Where it goes | How it shows up |
   |---|---|---|
   | Cover (card + top of page) | `cover.jpg` in the project folder | Set `cover: cover.jpg` in `index.md` |
   | Process images (CAD, calcs, iterations) | the `process/` folder | Add a line in your text: `![What it shows](process/02-fea.png)` |
   | Gallery | the `gallery/` folder | **Automatic.** Every image in this folder appears at the bottom of the page |

   Delete the placeholder `.svg` files when you replace them.

5. **Publish.** In a terminal opened in the portfolio folder:
   ```
   git add .
   git commit -m "Add RC plane wing project"
   git push
   ```
   Wait about 1 minute, then refresh your site. (`git add .` stages every change,
   `commit` saves a snapshot with a message, and `push` uploads it to GitHub.)

## Tips

- **Tags:** use `Class`, `Team`, `Personal`, or `Research`. Use several like this: `tags: [Class, Team]`.
  A filter button appears automatically once a project uses that tag.
  To add a new tag type, add it to `project_tags` in `_config.yml`.
- **Order:** the newest `date` comes first. The date must look like `2026-03-15`.
  Use `when: "Spring 2026"` to control how the date is displayed.
- **Home page:** set `featured: true` to show a project on the Home page (up to 3).
- **Drafts:** set `hidden: true` to hide a project without deleting it.
- **Captions:** put an *italic line* directly under an image: `*Stress plot at 500 N load.*`
- **Gallery order:** images are sorted by file name, so name them `01-...`, `02-...`.
- **Image size:** about 1600 px wide, JPG, under 500 KB each, so the site stays fast.
  ([squoosh.app](https://squoosh.app) shrinks images for free.)
- **Folders starting with `_` are not published**, which is why `_TEMPLATE` never shows on the site.

## Other common edits

| I want to... | Edit this |
|---|---|
| Change my bio, email, LinkedIn, or interests | `_config.yml` |
| Use my real photo | Add `assets/images/profile.jpg`, then set `photo:` in `_config.yml` |
| Update my resume | Replace `assets/resume.pdf` (keep the same name) |
| Add a page (e.g. Experience, Skills) | Create `experience.md` with `layout: page`, `title: Experience`, and `permalink: /experience/` between `---` lines, write in Markdown, then add it to `_data/navigation.yml` |
| Change colors or fonts | The top of `assets/css/style.css` |

**Something broke?** On GitHub, open your repo → **Actions** tab. A red ✗ means the
build failed, and clicking it shows which file has the problem. This is usually a typo
between the `---` lines, such as a missing quote or bracket.
