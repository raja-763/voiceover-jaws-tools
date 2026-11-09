-- VoiceOverItemChooser.applescript
-- A custom Item Chooser for VoiceOver on macOS.
-- Lists interactive UI elements in the frontmost window and moves
-- VoiceOver focus to whichever one you pick.
--
-- HOW TO INSTALL:
--   Run install.sh, or open this file in Script Editor and
--   File > Export > Application > save as VoiceOverItemChooser.app.
--   Then assign it a keyboard shortcut in:
--   System Settings > Keyboard > Keyboard Shortcuts > App Shortcuts
--   or add it to the VoiceOver Commander (VO+H then VO+H again).

use AppleScript version "2.5"
use scripting additions

-- Roles we surface in the chooser (all interactive / landmark types)
property interactiveRoles : {¬
    "AXButton", "AXTextField", "AXTextArea", ¬
    "AXCheckBox", "AXRadioButton", "AXPopUpButton", ¬
    "AXComboBox", "AXSlider", "AXLink", "AXMenuItem", ¬
    "AXList", "AXTable", "AXOutline", "AXBrowser", ¬
    "AXTabGroup", "AXScrollArea", "AXGroup", "AXToolbar"}

on run
    -- Grab the frontmost application process
    set frontProc to missing value
    tell application "System Events"
        try
            set frontProc to first process whose frontmost is true
        on error errMsg
            display dialog "Could not find frontmost application: " & errMsg ¬
                buttons {"OK"} default button "OK"
            return
        end try
    end tell

    set {appName, labelList, elemList} to collectElements(frontProc)

    if (count of labelList) is 0 then
        display dialog "No interactive elements found in "" & appName & ""." ¬
            buttons {"OK"} default button "OK"
        return
    end if

    -- Present the chooser dialog (VoiceOver reads this natively)
    set chosen to choose from list labelList ¬
        with title "Item Chooser — " & appName ¬
        with prompt "Select an element and press Navigate:" ¬
        OK button name "Navigate" ¬
        cancel button name "Cancel" ¬
        without multiple selections allowed

    if chosen is false then return

    -- Locate the matching element and focus it
    set chosenLabel to item 1 of chosen
    repeat with i from 1 to count of labelList
        if item i of labelList is chosenLabel then
            tell application "System Events"
                try
                    set focused of (item i of elemList) to true
                on error
                    -- Fallback: try performing AXPress (for buttons/links)
                    try
                        perform action "AXPress" of (item i of elemList)
                    end try
                end try
            end tell
            return
        end if
    end repeat
end run

-- Collect all interactive elements from the frontmost window
on collectElements(appProc)
    set labels to {}
    set elems to {}
    set appName to ""

    tell application "System Events"
        set appName to name of appProc
        try
            set wins to windows of appProc
            if (count of wins) is 0 then return {appName, {}, {}}

            set allChildren to entire contents of item 1 of wins

            repeat with elem in allChildren
                try
                    set r to role of elem
                    if r is in interactiveRoles then
                        set lbl to labelForElement(elem, r)
                        if lbl is not "" then
                            set end of labels to lbl
                            set end of elems to elem
                        end if
                    end if
                end try
            end repeat
        end try
    end tell

    return {appName, labels, elems}
end collectElements

-- Build a human-readable label for one element
on labelForElement(elem, role)
    set txt to ""
    tell application "System Events"
        -- Prefer description, then title, then value, then help
        repeat with getter in {"description", "title", "value", "help"}
            try
                set raw to (get getter of elem) as string
                if raw is not "" and raw is not "missing value" then
                    set txt to raw
                    exit repeat
                end if
            end try
        end repeat
    end tell
    if txt is "" then return ""
    return txt & "  [" & humanRole(role) & "]"
end labelForElement

-- Convert an AX role string to a readable name
on humanRole(r)
    if r is "AXButton" then return "Button"
    if r is "AXTextField" then return "Text Field"
    if r is "AXTextArea" then return "Text Area"
    if r is "AXCheckBox" then return "Check Box"
    if r is "AXRadioButton" then return "Radio Button"
    if r is "AXPopUpButton" then return "Pop-up Menu"
    if r is "AXComboBox" then return "Combo Box"
    if r is "AXSlider" then return "Slider"
    if r is "AXLink" then return "Link"
    if r is "AXMenuItem" then return "Menu Item"
    if r is "AXList" then return "List"
    if r is "AXTable" then return "Table"
    if r is "AXOutline" then return "Outline"
    if r is "AXBrowser" then return "Browser"
    if r is "AXTabGroup" then return "Tab Group"
    if r is "AXToolbar" then return "Toolbar"
    if r is "AXScrollArea" then return "Scroll Area"
    if r is "AXGroup" then return "Group"
    return r
end humanRole
