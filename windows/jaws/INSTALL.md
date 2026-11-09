# How to Add VoiceOverTools to JAWS

## The easy way — run install.bat (recommended)

1. Download the ZIP from GitHub:
   - Go to **https://github.com/raja-763/voiceover-jaws-tools**
   - Click the green **Code** button
   - Click **Download ZIP**

2. Find the downloaded file (usually in your **Downloads** folder),
   right-click it, and choose **Extract All**.

3. Open the extracted folder, then open **windows**, then **jaws**.

4. Double-click **install.bat**.
   - If Windows asks "Do you want to allow this app to make changes?",
     click **Yes**.
   - The installer will find your JAWS version automatically and copy
     the script files to the right place.

5. When you see "Installation complete!", press **Enter** to close the window.

6. Restart JAWS:
   - Press **Insert+F2** to open the JAWS menu.
   - Arrow down to **Restart JAWS** and press **Enter**.
   - Or simply close and reopen JAWS.

That's it. Your new shortcuts are ready.

---

## What the installer puts where

JAWS scripts live in a special folder on your computer:

```
C:\Users\YourName\AppData\Roaming\Freedom Scientific\JAWS\2024\Settings\ENU\
```

(The year changes depending on your JAWS version — the installer finds it
automatically.)

The installer copies two files there:

| File | What it is |
|---|---|
| `VoiceOverTools.jss` | The script source code |
| `VoiceOverTools.jkm` | The keyboard shortcut definitions |

---

## The manual way (if install.bat doesn't work)

### Step 1 — Find your JAWS settings folder

1. Press **Windows+R**, type `%APPDATA%`, press **Enter**.
2. Open the folder: `Freedom Scientific` → `JAWS` → (your version number, e.g. `2024`) → `Settings` → `ENU`.
   - If you don't see `Freedom Scientific`, JAWS may not be installed yet.

### Step 2 — Copy the files

Copy both of these files into the ENU folder you just opened:

- `VoiceOverTools.jss`
- `VoiceOverTools.jkm`

### Step 3 — Compile the script

JAWS scripts must be compiled before JAWS can use them.

1. Press **Insert+0** (zero on the number row, not the numpad) to open
   **JAWS Script Manager**.
   - Alternatively: press **Insert+F2**, arrow to **Explore JAWS**, press **Enter**,
     then open **Script Manager**.

2. In Script Manager, click **File** → **Open**.

3. Navigate to the ENU folder from Step 1 and open **VoiceOverTools.jss**.

4. Press **F5** (or click **Script** → **Compile**).
   - You should see "Compile successful" at the bottom of the window.
   - If you see errors, make sure you copied the file correctly and that
     your JAWS version is 2020 or later.

5. Close Script Manager (**Alt+F4**).

### Step 4 — Restart JAWS

Press **Insert+F2**, arrow to **Restart JAWS**, press **Enter**.

---

## Your new keyboard shortcuts

| Press this | What happens |
|---|---|
| **Insert+Ctrl+I** | Opens the **Item Chooser** — a single list of all buttons, links, text fields, checkboxes, etc. in the current window. Type to filter, arrow to browse, Enter to jump there. |
| **Insert+NumPad 5** | **VoiceOver Router** — moves the Windows cursor to wherever JAWS is reading. Same as the cursor-routing feature in VoiceOver. |
| **Insert+Shift+NumPad 5** | Reverse router — moves the JAWS reading cursor to where the Windows cursor is. |

> **Note:** "Insert" is the standard JAWS key. If you use Caps Lock as your
> JAWS key, replace Insert with Caps Lock in the shortcuts above.

---

## Troubleshooting

**"The script compiled but the shortcut doesn't work"**
- Make sure you restarted JAWS after compiling.
- Press Insert+F2 and check that VoiceOverTools is listed under scripts.

**"Install.bat says JAWS settings folder not found"**
- Confirm JAWS is installed on this computer.
- Try the manual steps above and copy the files yourself.

**"I want to change the keyboard shortcuts"**
- Open `VoiceOverTools.jkm` in Notepad.
- Change the key on the left side of each `=` sign.
- Save the file and restart JAWS (no recompile needed for key maps).
