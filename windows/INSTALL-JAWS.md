# Installing VoiceOverTools with JAWS — Keyboard-Only Guide

These steps use only the keyboard. No mouse needed.

---

## Step 1 — Download the files from GitHub

1. Press **Windows+R** to open the Run dialog.
2. Type `https://github.com/raja-763/voiceover-jaws-tools` and press **Enter**.
   Your default browser opens the GitHub page.
3. Press **Tab** repeatedly until JAWS says "Code, button" (or use **B** to jump
   to the next button if you are in JAWS virtual cursor mode).
4. Press **Enter** on the Code button. A menu opens.
5. Press **Tab** until JAWS says "Download ZIP, link" then press **Enter**.
6. JAWS will announce a download starting. Wait for it to finish
   (JAWS says "Download complete" or your browser announces it).

---

## Step 2 — Extract the ZIP file

1. Press **Windows+E** to open File Explorer.
2. Press **Alt+D** to move focus to the address bar.
3. Type `%USERPROFILE%\Downloads` and press **Enter**.
4. Press the first letter **v** to jump to files starting with V, then
   arrow down until JAWS says "voiceover-jaws-tools" followed by "zip file".
5. Press the **Applications key** (or **Shift+F10**) to open the context menu.
6. Arrow down until JAWS says "Extract All" and press **Enter**.
7. A dialog opens. Press **Enter** again to extract to the default location.
   Wait for extraction to complete, then press **Enter** when the
   "Show extracted files" checkbox dialog appears.

---

## Step 3 — Run the installer

1. File Explorer now shows the extracted folder. Press **Enter** to open it.
2. Press **Enter** on the folder named `voiceover-jaws-tools`.
3. Press **Enter** on the folder named `windows`.
4. Press **Enter** on the folder named `jaws`.
5. Arrow down until JAWS says "install, batch file" (or "install.bat").
6. Press the **Applications key** (or **Shift+F10**) to open the context menu.
7. Arrow down until JAWS says "Run as administrator" (or just "Open") and
   press **Enter**.
   - If Windows asks "Do you want to allow this app to make changes?"
     press **Alt+Y** to say Yes.
8. A Command Prompt window opens and reads itself aloud. Wait until JAWS
   reads the line "Installation complete!" and then "Press any key to continue."
9. Press **Enter** or **Space** to close the installer.

---

## Step 4 — Restart JAWS

Press **Insert+F2** to open the JAWS menu, arrow down to
**Restart JAWS**, and press **Enter**.

That is all. JAWS reloads with the new scripts active.

---

## Using the new features

After restart these shortcuts work in any application:

| What to press | What it does |
|---|---|
| **Insert+Ctrl+I** | Opens the Item Chooser — a single list of every button, link, text field, check box, and other control on screen. Type any letters to filter the list, arrow up/down to browse, **Enter** to jump to that element, **Escape** to close without moving. |
| **Insert+NumPad 5** | VoiceOver Router — moves the Windows text cursor to wherever the JAWS reading cursor is sitting right now. |
| **Insert+Shift+NumPad 5** | Reverse Router — moves the JAWS reading cursor to the Windows text cursor position. |

> **Tip:** The Item Chooser works like VoiceOver's VO+I on Mac.
> Start typing as soon as it opens to narrow the list.
> For example, type "save" to jump straight to a Save button.

---

## Troubleshooting

**"install.bat is not recognized"**
Make sure you are running the file from inside the `windows\jaws\` folder,
not from the outer `voiceover-jaws-tools` folder.

**Shortcuts do not work after restart**
Open JAWS Script Manager with **Insert+0** (numpad zero), press **Ctrl+O**,
navigate to your JAWS settings folder
(`%APPDATA%\Freedom Scientific\JAWS\<version>\Settings\ENU\`),
open `VoiceOverTools.jss`, and press **Ctrl+B** to compile it.
Then restart JAWS again.

**I do not know my JAWS version**
Press **Insert+J** to open the JAWS window, then **Alt+H**, then **A** for
"About JAWS". Your version number is in the dialog that opens.
