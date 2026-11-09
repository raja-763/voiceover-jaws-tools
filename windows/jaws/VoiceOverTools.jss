; VoiceOverTools.jss
; Provides VoiceOver-style features inside JAWS on Windows.
;
; SCRIPTS
; -------
;   JAWSItemChooser      — unified element chooser (like VoiceOver VO+I)
;                          Shows ALL buttons, links, fields, etc. in ONE
;                          filterable list.  Type to narrow, arrow to browse,
;                          Enter to jump, Escape to cancel.
;                          Key: Insert+Ctrl+I
;
;   OpenRotor            — VoiceOver Rotor (like VoiceOver VO+U on Mac)
;                          Opens a category wheel: Links, Headings, Buttons,
;                          Form Controls, Tables, Images.
;                          Use Insert+Ctrl+Left/Right to spin the rotor and
;                          hear the category name.  Press Insert+U to open
;                          the list for the current category.
;                          Key: Insert+U
;
;   RotorLeft            — Spin rotor to the previous category.
;                          Key: Insert+Ctrl+Left
;
;   RotorRight           — Spin rotor to the next category.
;                          Key: Insert+Ctrl+Right
;
;   RoutePCCursorToJAWS  — VoiceOver-style cursor router.
;                          Moves the Windows insertion point to wherever the
;                          JAWS reading cursor currently sits.
;                          Key: Insert+NumPad5
;
;   RouteJAWSToPCCursor  — Reverse router: moves JAWS cursor to PC cursor.
;                          Key: Insert+Shift+NumPad5
;
; INSTALLATION — run install.bat or see INSTALL-JAWS.md for manual steps.


; ================================================================
; Script 1 — Unified Item Chooser (VoiceOver VO+I style)
; ================================================================
Script JAWSItemChooser ()
  Var
    String sWinTitle,
    String sDialogTitle,
    String sElements[500],
    Int    iCount,
    Int    iSelected

  ; Build dialog title from active window name
  Let sWinTitle    = GetActiveWindowName()
  Let sDialogTitle = "Item Chooser"
  If StringLength(sWinTitle) > 0 Then
    Let sDialogTitle = sDialogTitle + " — " + sWinTitle
  EndIf

  ; Brief spoken hint (mirrors VoiceOver's item-chooser announcement)
  SayMessage(OT_JAWS_MESSAGE,
    "Item Chooser. Type to filter. Up and down arrows to browse. Enter to go. Escape to cancel.",
    "Item Chooser opened")

  ; Walk the accessibility tree and fill sElements[]
  Let iCount = 0
  Call CollectElements(sElements, iCount)

  ; If nothing was found via the tree walk, fall back to the
  ; built-in JAWS Elements List (which also works like VO+I but
  ; groups items into tabs instead of one flat list)
  If iCount == 0 Then
    SayMessage(OT_JAWS_MESSAGE,
      "Switching to JAWS Elements List. Use tab to move between categories.",
      "")
    JAWSElementsList()
    Return
  EndIf

  ; ---- Show the unified chooser ----
  ; SelectList() opens an accessible, keyboard-navigable dialog.
  ; The user can type any text to filter the list in real time,
  ; exactly as VoiceOver's Item Chooser works.
  Let iSelected = SelectList(sDialogTitle, sElements, iCount)

  If iSelected >= 1 Then
    SayMessage(OT_JAWS_MESSAGE, "Navigated to: " + sElements[iSelected], "")
  EndIf
EndScript


; ----------------------------------------------------------------
; CollectElements — walks the MSAA/UIA accessibility tree of the
; current foreground window and appends interactive elements to
; the sElements array.
; ----------------------------------------------------------------
Void Function CollectElements(String sElements[], Int iCount)
  Var
    Int    hFocus,
    Int    hRoot,
    Int    hChild,
    String sName,
    Int    iRole

  ; Start from the focused object and climb to the window root
  Let hFocus = GetFocus()
  If hFocus == 0 Then Return

  Let hRoot = hFocus
  Var Int hParent
  Let hParent = ParentObject(hRoot)
  While hParent != 0
    Let hRoot   = hParent
    Let hParent = ParentObject(hRoot)
  EndWhile

  ; Walk direct children of the root window
  Let hChild = FirstObject(hRoot, OT_CHILD)
  While hChild != 0 And iCount < 490
    Let sName  = GetObjectName(hChild)
    Let iRole  = GetObjectRole(hChild)
    If StringLength(sName) > 0 Then
      If IsInterestingRole(iRole) Then
        Let iCount             = iCount + 1
        Let sElements[iCount]  = sName + "  [" + RoleLabel(iRole) + "]"
      EndIf
    EndIf

    ; One level of grandchildren (covers most dialog layouts)
    Var Int hGrand
    Let hGrand = FirstObject(hChild, OT_CHILD)
    While hGrand != 0 And iCount < 490
      Let sName  = GetObjectName(hGrand)
      Let iRole  = GetObjectRole(hGrand)
      If StringLength(sName) > 0 Then
        If IsInterestingRole(iRole) Then
          Let iCount             = iCount + 1
          Let sElements[iCount]  = sName + "  [" + RoleLabel(iRole) + "]"
        EndIf
      EndIf
      Let hGrand = NextObject(hGrand, OT_NEXT)
    EndWhile

    Let hChild = NextObject(hChild, OT_NEXT)
  EndWhile
EndFunction


; ----------------------------------------------------------------
; IsInterestingRole — returns 1 for roles worth showing in the
; chooser, 0 for containers and other noise.
; ----------------------------------------------------------------
Int Function IsInterestingRole(Int iRole)
  If iRole == ROLE_SYSTEM_PUSHBUTTON    Then Return 1
  If iRole == ROLE_SYSTEM_CHECKBUTTON   Then Return 1
  If iRole == ROLE_SYSTEM_RADIOBUTTON   Then Return 1
  If iRole == ROLE_SYSTEM_COMBOBOX      Then Return 1
  If iRole == ROLE_SYSTEM_LIST          Then Return 1
  If iRole == ROLE_SYSTEM_MENUITEM      Then Return 1
  If iRole == ROLE_SYSTEM_LINK          Then Return 1
  If iRole == ROLE_SYSTEM_TEXT          Then Return 1
  If iRole == ROLE_SYSTEM_SLIDER        Then Return 1
  If iRole == ROLE_SYSTEM_SPINBUTTON    Then Return 1
  If iRole == ROLE_SYSTEM_TAB           Then Return 1
  If iRole == ROLE_SYSTEM_PAGETABLIST   Then Return 1
  If iRole == ROLE_SYSTEM_TABLE         Then Return 1
  If iRole == ROLE_SYSTEM_OUTLINE       Then Return 1
  Return 0
EndFunction


; ----------------------------------------------------------------
; RoleLabel — human-readable label for each MSAA role constant.
; These match the labels VoiceOver uses so the experience feels
; consistent when moving between Mac and Windows.
; ----------------------------------------------------------------
String Function RoleLabel(Int iRole)
  If iRole == ROLE_SYSTEM_PUSHBUTTON    Then Return "Button"
  If iRole == ROLE_SYSTEM_CHECKBUTTON   Then Return "Check Box"
  If iRole == ROLE_SYSTEM_RADIOBUTTON   Then Return "Radio Button"
  If iRole == ROLE_SYSTEM_COMBOBOX      Then Return "Pop-up Menu"
  If iRole == ROLE_SYSTEM_LIST          Then Return "List"
  If iRole == ROLE_SYSTEM_MENUITEM      Then Return "Menu Item"
  If iRole == ROLE_SYSTEM_LINK          Then Return "Link"
  If iRole == ROLE_SYSTEM_TEXT          Then Return "Text Field"
  If iRole == ROLE_SYSTEM_SLIDER        Then Return "Slider"
  If iRole == ROLE_SYSTEM_SPINBUTTON    Then Return "Stepper"
  If iRole == ROLE_SYSTEM_TAB           Then Return "Tab"
  If iRole == ROLE_SYSTEM_PAGETABLIST   Then Return "Tab Group"
  If iRole == ROLE_SYSTEM_TABLE         Then Return "Table"
  If iRole == ROLE_SYSTEM_OUTLINE       Then Return "Tree"
  Return "Control"
EndFunction


; ================================================================
; ROTOR — Global state
; g_RotorPos tracks which category the rotor is currently set to.
; 1=Links  2=Headings  3=Buttons  4=Form Controls  5=Tables  6=Images
; ================================================================
Globals
  Int    g_RotorPos
EndGlobals


; ----------------------------------------------------------------
; RotorCategoryName — returns the display name for a rotor slot.
; ----------------------------------------------------------------
String Function RotorCategoryName(Int iPos)
  If iPos == 1 Then Return "Links"
  If iPos == 2 Then Return "Headings"
  If iPos == 3 Then Return "Buttons"
  If iPos == 4 Then Return "Form Controls"
  If iPos == 5 Then Return "Tables"
  If iPos == 6 Then Return "Images"
  Return "Links"
EndFunction


; ----------------------------------------------------------------
; RotorRoleMatch — returns 1 if iRole belongs to rotor slot iPos.
; ----------------------------------------------------------------
Int Function RotorRoleMatch(Int iRole, Int iPos)
  If iPos == 1 Then  ; Links
    If iRole == ROLE_SYSTEM_LINK Then Return 1
    Return 0
  EndIf
  If iPos == 2 Then  ; Headings (native apps use GROUPING for section headers)
    If iRole == ROLE_SYSTEM_GROUPING Then Return 1
    Return 0
  EndIf
  If iPos == 3 Then  ; Buttons
    If iRole == ROLE_SYSTEM_PUSHBUTTON Then Return 1
    Return 0
  EndIf
  If iPos == 4 Then  ; Form Controls
    If iRole == ROLE_SYSTEM_TEXT        Then Return 1
    If iRole == ROLE_SYSTEM_CHECKBUTTON Then Return 1
    If iRole == ROLE_SYSTEM_RADIOBUTTON Then Return 1
    If iRole == ROLE_SYSTEM_COMBOBOX    Then Return 1
    If iRole == ROLE_SYSTEM_SPINBUTTON  Then Return 1
    If iRole == ROLE_SYSTEM_SLIDER      Then Return 1
    Return 0
  EndIf
  If iPos == 5 Then  ; Tables
    If iRole == ROLE_SYSTEM_TABLE Then Return 1
    Return 0
  EndIf
  If iPos == 6 Then  ; Images
    If iRole == ROLE_SYSTEM_GRAPHIC Then Return 1
    Return 0
  EndIf
  Return 0
EndFunction


; ----------------------------------------------------------------
; CollectByCategory — same tree walk as CollectElements but only
; collects items whose role matches the given rotor slot.
; ----------------------------------------------------------------
Void Function CollectByCategory(String sElements[], Int iCount, Int iPos)
  Var
    Int    hFocus,
    Int    hRoot,
    Int    hChild,
    String sName,
    Int    iRole,
    Int    hParent,
    Int    hGrand

  Let hFocus = GetFocus()
  If hFocus == 0 Then Return

  Let hRoot   = hFocus
  Let hParent = ParentObject(hRoot)
  While hParent != 0
    Let hRoot   = hParent
    Let hParent = ParentObject(hRoot)
  EndWhile

  Let hChild = FirstObject(hRoot, OT_CHILD)
  While hChild != 0 And iCount < 490
    Let sName = GetObjectName(hChild)
    Let iRole = GetObjectRole(hChild)
    If StringLength(sName) > 0 Then
      If RotorRoleMatch(iRole, iPos) Then
        Let iCount            = iCount + 1
        Let sElements[iCount] = sName
      EndIf
    EndIf

    Let hGrand = FirstObject(hChild, OT_CHILD)
    While hGrand != 0 And iCount < 490
      Let sName = GetObjectName(hGrand)
      Let iRole = GetObjectRole(hGrand)
      If StringLength(sName) > 0 Then
        If RotorRoleMatch(iRole, iPos) Then
          Let iCount            = iCount + 1
          Let sElements[iCount] = sName
        EndIf
      EndIf
      Let hGrand = NextObject(hGrand, OT_NEXT)
    EndWhile

    Let hChild = NextObject(hChild, OT_NEXT)
  EndWhile
EndFunction


; ================================================================
; Script 4 — Open Rotor (VoiceOver VO+U style)
; Opens the item list for the current rotor category.
; Key: Insert+U
; ================================================================
Script OpenRotor ()
  Var
    String sElements[500],
    Int    iCount,
    Int    iSelected,
    String sCat,
    String sTitle

  ; Default rotor position to 1 (Links) on first use
  If g_RotorPos < 1 Or g_RotorPos > 6 Then
    Let g_RotorPos = 1
  EndIf

  Let sCat   = RotorCategoryName(g_RotorPos)
  Let sTitle = "Rotor: " + sCat

  SayMessage(OT_JAWS_MESSAGE,
    sCat + ". Up and down arrows to browse. Enter to jump. Use Insert+Ctrl+Left or Right to change category.",
    sCat)

  Let iCount = 0
  Call CollectByCategory(sElements, iCount, g_RotorPos)

  If iCount == 0 Then
    SayMessage(OT_JAWS_MESSAGE, "No " + sCat + " found on this screen.", "No " + sCat)
    Return
  EndIf

  Let iSelected = SelectList(sTitle, sElements, iCount)

  If iSelected >= 1 Then
    SayMessage(OT_JAWS_MESSAGE, "Navigated to: " + sElements[iSelected], "")
  EndIf
EndScript


; ================================================================
; Script 5 — Spin Rotor Left (previous category)
; Key: Insert+Ctrl+Left
; ================================================================
Script RotorLeft ()
  If g_RotorPos < 1 Or g_RotorPos > 6 Then
    Let g_RotorPos = 1
  EndIf

  Let g_RotorPos = g_RotorPos - 1
  If g_RotorPos < 1 Then
    Let g_RotorPos = 6
  EndIf

  SayMessage(OT_JAWS_MESSAGE,
    "Rotor: " + RotorCategoryName(g_RotorPos) + ". Press Insert+U to browse.",
    RotorCategoryName(g_RotorPos))
EndScript


; ================================================================
; Script 6 — Spin Rotor Right (next category)
; Key: Insert+Ctrl+Right
; ================================================================
Script RotorRight ()
  If g_RotorPos < 1 Or g_RotorPos > 6 Then
    Let g_RotorPos = 1
  EndIf

  Let g_RotorPos = g_RotorPos + 1
  If g_RotorPos > 6 Then
    Let g_RotorPos = 1
  EndIf

  SayMessage(OT_JAWS_MESSAGE,
    "Rotor: " + RotorCategoryName(g_RotorPos) + ". Press Insert+U to browse.",
    RotorCategoryName(g_RotorPos))
EndScript


; ================================================================
; Script 7 — VoiceOver Cursor Router
; Moves the Windows PC cursor to wherever the JAWS cursor sits.
; This is the JAWS equivalent of VoiceOver cursor routing.
; Key: Insert+NumPad5
; ================================================================
Script RoutePCCursorToJAWS ()
  SayMessage(OT_JAWS_MESSAGE, "Routing PC cursor to JAWS position", "Routing")
  RoutePCToJAWS()
  SayMessage(OT_JAWS_MESSAGE, "Done — PC cursor is now at JAWS position", "Done")
EndScript


; ================================================================
; Script 9 — Reverse Router
; Moves the JAWS cursor to the Windows PC cursor position.
; Key: Insert+Shift+NumPad5
; ================================================================
Script RouteJAWSToPCCursor ()
  SayMessage(OT_JAWS_MESSAGE, "Routing JAWS cursor to PC position", "Routing")
  RouteJAWSToPC()
  SayMessage(OT_JAWS_MESSAGE, "Done — JAWS cursor is now at PC position", "Done")
EndScript
