# VoiceOver & JAWS Tools

Two accessibility tools that bring cross-platform parity to screen-reader power users:

| Tool | Platform | What it does |
|---|---|---|
| **Item Chooser** | macOS (VoiceOver) | Lists every interactive element in the frontmost window; pick one to jump straight to it |
| **Item Chooser** | Windows (JAWS) | Opens the JAWS Elements List — filter by links, buttons, fields, headings, frames |
| **VoiceOver Router** | Windows (JAWS) | Moves the Windows PC cursor to wherever the JAWS reading cursor sits (mirrors VoiceOver's cursor-routing feature) |

---

## macOS — VoiceOver Item Chooser

### Requirements
- macOS 12 Monterey or later
- VoiceOver enabled (System Settings › Accessibility › VoiceOver)
- Accessibility permission granted to Script Editor / the compiled app

### Quick install

```bash
cd macos
bash install.sh
```

This compiles `VoiceOverItemChooser.applescript` and places
`VoiceOverItemChooser.app` in `/Applications`.

### Manual compile (if install.sh fails)

1. Open `macos/VoiceOverItemChooser.applescript` in **Script Editor**.
2. **File › Export › File Format: Application** — save as
   `VoiceOverItemChooser.app` wherever you like.

### Assign a keyboard shortcut

**Option A — System keyboard shortcut (works globally)**

1. System Settings › Keyboard › Keyboard Shortcuts › App Shortcuts › **+**
2. Application: **All Applications**
3. Menu Title: leave blank
4. Shortcut: pick something free, e.g. `⌃⌥I` (Control+Option+I)
5. Click **Done** — open the app once to grant Accessibility permission.

**Option B — VoiceOver Commander**

1. Open VoiceOver Utility (VO+F8) › Commanders › Keyboard Commander
2. Click **+**, press your desired key, set the action to
   **Open Application › VoiceOverItemChooser**.

### How it works

When you run the app it:
1. Finds the frontmost application and walks its first window's accessibility tree.
2. Collects every button, field, checkbox, link, table, slider, and other
   interactive element, labelling each with its accessible name and role.
3. Presents a standard macOS list dialog — VoiceOver reads this natively;
   you can type to filter, arrow to browse, then press **Navigate**.
4. Moves VoiceOver focus to the chosen element.

---

## Windows — JAWS Item Chooser + VoiceOver Router

### Requirements
- JAWS 2020 or later (Freedom Scientific)
- Windows 10 / 11

### Quick install

1. Download `windows/jaws/` to your Windows computer.
2. Double-click `install.bat`.
3. The script auto-detects your JAWS version, copies the files, and compiles
   the script.
4. Restart JAWS when prompted (`Insert+F2 › Restart JAWS`).

### New keyboard shortcuts after install

| Shortcut | Action |
|---|---|
| `Insert+Ctrl+I` | **Item Chooser** — opens the JAWS Elements List |
| `Insert+NumPad 5` | **VoiceOver Router** — routes PC cursor to JAWS cursor position |
| `Insert+Shift+NumPad 5` | Routes JAWS cursor back to the PC cursor position |

> **Tip:** `Insert` here is the standard JAWS key. If you use Caps Lock as your
> JAWS key, replace `Insert` with `CapsLock` in the shortcuts above.

### Manual install (if install.bat fails)

1. Find your JAWS settings folder:
   ```
   %APPDATA%\Freedom Scientific\JAWS\<your-version>\Settings\ENU\
   ```
2. Copy `VoiceOverTools.jss` and `VoiceOverTools.jkm` there.
3. Open JAWS Script Manager (`Insert+0` on the numpad) and compile `VoiceOverTools.jss`.
4. Restart JAWS.

### How it works

**Item Chooser (`Insert+Ctrl+I`)**
Calls JAWS's built-in `JAWSElementsList()` function which opens an accessible
dialog with tabs for Links, Buttons, Form Fields, Headings, and Frames.  You can
type to filter, arrow to browse, then press Enter to jump — the same idea as
VoiceOver's VO+I Item Chooser.

**VoiceOver Router (`Insert+NumPad 5`)**
Calls JAWS's `RoutePCToJAWS()` — this is the direct equivalent of VoiceOver's
cursor routing.  VoiceOver lets you press VO+Shift+F5 (or a Braille routing key)
to move the system cursor to where VoiceOver is reading; this script does the
same thing for JAWS in a single keypress.

**Reverse Router (`Insert+Shift+NumPad 5`)**
Calls `RouteJAWSToPC()` — moves the JAWS reading cursor to the Windows
insertion point.

---

## Repository layout

```
voiceover-jaws-tools/
├── README.md
├── macos/
│   ├── VoiceOverItemChooser.applescript   ← main script
│   └── install.sh                         ← one-step installer
└── windows/
    └── jaws/
        ├── VoiceOverTools.jss             ← JAWS script source
        ├── VoiceOverTools.jkm             ← keyboard shortcuts
        └── install.bat                    ← one-step installer
```

## License

MIT — see LICENSE file.
