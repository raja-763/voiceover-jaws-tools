; VoiceOverTools.jss
; JAWS Scripts — Item Chooser and VoiceOver-style Cursor Router
;
; WHAT THIS FILE PROVIDES
; -----------------------
; 1. JAWSItemChooser  — opens a navigable list of interactive page
;    elements, similar to VoiceOver's Item Chooser (VO+I).
;    Default key: Insert+Ctrl+I
;
; 2. RoutePCCursorToJAWS  — moves the Windows (PC) cursor to wherever
;    the JAWS cursor currently sits.  This mirrors VoiceOver's
;    "cursor routing" behaviour.
;    Default key: Insert+Num5 (numpad 5)
;
; 3. RouteJAWSToPCCursor  — moves the JAWS cursor to the Windows
;    (PC) cursor position.
;    Default key: Insert+Shift+Num5 (numpad 5)
;
; INSTALLATION — see install.bat or README.md

; ================================================================
; Script 1 — JAWS Item Chooser
; ================================================================
Script JAWSItemChooser ()
  Var
    String sAppName,
    String sTitle,
    String sMsg

  ; Get the name of the focused application for the title bar.
  Let sAppName = GetActiveWindowName ()
  Let sTitle   = "Item Chooser"
  If StringLength (sAppName) > 0 Then
    Let sTitle = sTitle + " — " + sAppName
  EndIf

  ; Announce entry
  SayMessage (OT_JAWS_MESSAGE, "Item Chooser opened", "Item Chooser opened")

  ; JAWSElementsList() opens the built-in Elements List dialog, which
  ; offers tabs for Links, Buttons, Form Fields, Headings, and Frames.
  ; It is the JAWS equivalent of VoiceOver's Item Chooser (VO+I).
  ; The user can type to filter, arrow to navigate, and Enter to jump.
  JAWSElementsList ()

EndScript


; ================================================================
; Script 2 — Route PC Cursor to JAWS Cursor (VoiceOver Router)
; ================================================================
Script RoutePCCursorToJAWS ()
  ; Moves the Windows insertion point / mouse to wherever the JAWS
  ; virtual or reading cursor currently is.  This is the JAWS
  ; equivalent of the VoiceOver cursor-routing feature.
  SayMessage (OT_JAWS_MESSAGE, "Routing PC cursor to JAWS", "Routing PC cursor to JAWS")
  RoutePCToJAWS ()
  SayMessage (OT_JAWS_MESSAGE, "PC cursor routed to JAWS position", "PC cursor routed to JAWS position")
EndScript


; ================================================================
; Script 3 — Route JAWS Cursor to PC Cursor
; ================================================================
Script RouteJAWSToPCCursor ()
  SayMessage (OT_JAWS_MESSAGE, "Routing JAWS to PC cursor", "Routing JAWS to PC cursor")
  RouteJAWSToPC ()
  SayMessage (OT_JAWS_MESSAGE, "JAWS cursor routed to PC position", "JAWS cursor routed to PC position")
EndScript
