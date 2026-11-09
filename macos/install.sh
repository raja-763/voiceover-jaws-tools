#!/usr/bin/env bash
# install.sh — VoiceOverItemChooser macOS installer
# Compiles the AppleScript to a .app bundle in /Applications.

set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="/Applications/VoiceOverItemChooser.app"

echo "=== VoiceOver Item Chooser — macOS Installer ==="
echo ""
echo "Compiling AppleScript → $DEST"
osacompile -o "$DEST" "$DIR/VoiceOverItemChooser.applescript"
echo ""
echo "Done!  The app is at $DEST"
echo ""
echo "Next steps:"
echo "  1. Open VoiceOverItemChooser from /Applications to test it."
echo "  2. Assign a shortcut: System Settings > Keyboard > Keyboard Shortcuts"
echo "     > App Shortcuts > + > Application: All Applications"
echo "     > Menu Title: (leave blank)  > Shortcut: pick something free, e.g. ⌃⌥I"
echo "  3. Or add it to the VoiceOver Commander:"
echo "     Open VoiceOver Utility > Commanders > Keyboard Commander > +"
echo ""
echo "macOS may ask for Accessibility permission the first time you run it."
echo "Allow it in System Settings > Privacy & Security > Accessibility."
