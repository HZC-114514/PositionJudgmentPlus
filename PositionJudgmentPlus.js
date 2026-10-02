// Name: PositionJudgmentPlus
// ID: PositionJudgmentPlus
// Description: A Scratch extension for geometric position checks: point-in-shape tests, shape overlap detection, and handy math utilities.
// By: CheeseNeko_Nya
// License: GPL-3,0

//Update At 2026/10/2
//Version 1.4.0

(function () {
    const Icon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxODMuODg4ODkiIGhlaWdodD0iMTgzLjg4ODg5IiB2aWV3Qm94PSIwLDAsMTgzLjg4ODg5LDE4My44ODg4OSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0OC4wNTU1NSwtODguMDU1NTYpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xNDguMDU1NTUsMjcxLjk0NDQ1di0xODMuODg4ODloMTgzLjg4ODg5djE4My44ODg4OXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PGc+PHBhdGggZD0iTTIxMC45NTY4NSwxOTUuNTIwNDljMCwtMzEuNjY4MjUgMjUuNjcyMiwtNTcuMzQwNDUgNTcuMzQwNDUsLTU3LjM0MDQ1YzMxLjY2ODI1LDAgNTcuMzQwNDQsMjUuNjcyMiA1Ny4zNDA0NCw1Ny4zNDA0NWMwLDMxLjY2ODI1IC0yNS42NzIxOSw1Ny4zNDA0NCAtNTcuMzQwNDQsNTcuMzQwNDRjLTMxLjY2ODI1LDAgLTU3LjM0MDQ1LC0yNS42NzIxOSAtNTcuMzQwNDUsLTU3LjM0MDQ0eiIgZmlsbD0iIzFhZDdhMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMTc4LjEzOTI3LDEwNy4xMzkwOWg4Ni43OTQ0MWMxNS44MDY0OSwwIDIzLjc3NzAxLDcuOTcwNTMgMjMuNzc3MDEsMjMuNzc3MDF2NTAuNDM2MDljMCwxNS44MDY0OSAtNy45NzA1MywyMy43NzcwMSAtMjMuNzc3MDEsMjMuNzc3MDFoLTg2Ljc5NDQxYy0xNS44MDY0NywwIC0yMy43NzcwMSwtNy45NzA1NCAtMjMuNzc3MDEsLTIzLjc3NzAxdi01MC40MzYwOWMwLC0xNS44MDY0NyA3Ljk3MDU0LC0yMy43NzcwMSAyMy43NzcwMSwtMjMuNzc3MDF6IiBmaWxsPSIjMWFkN2ExIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMDguOTQ3ODEsMjA1LjAzNjI3YzAsMCAtMC45NjA3NCwtMTcuMTU1NTggNy4wNzM3NiwtMzMuMTMyMTZjNC43OTYxNCwtOS41MzcxMSAxNi40NTUzLC0xNy4xNzM2NCAyMy4zMTI1MywtMjQuNTg4MTljNi4xODQ4OCwtNi42ODc1NiAyNi4wMDYyOSwtNS4yMDc1NSAyOC45NzI3NSwtNy43NDU2YzQuMjI2NTksLTMuNjE2MTkgMTYuMDI5NTUsMC45NjQ4MSAxNi4wMjk1NSwwLjk2NDgxYzAsMCAwLDM2LjQ2NTUxIDAsNDguMjc2NDJjMCw4Ljg4NzY1IC0zLjg3Njc1LDE2LjIyNDczIC0xMS4zMTMzNSwxNi4yMjQ3M2MtMTIuNjM4NjcsMCAtNjQuMDc1MjMsMCAtNjQuMDc1MjMsMHoiIGZpbGw9IiMxN2JlOGUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTE3OC4xMzkyNywxMDcuMTM5MDloODYuNzk0NDFjMTUuODA2NDksMCAyMy43NzcwMSw3Ljk3MDUzIDIzLjc3NzAxLDIzLjc3NzAxdjUwLjQzNjA5YzAsMTUuODA2NDkgLTcuOTcwNTMsMjMuNzc3MDEgLTIzLjc3NzAxLDIzLjc3NzAxaC04Ni43OTQ0MWMtMTUuODA2NDcsMCAtMjMuNzc3MDEsLTcuOTcwNTQgLTIzLjc3NzAxLC0yMy43NzcwMXYtNTAuNDM2MDljMCwtMTUuODA2NDcgNy45NzA1NCwtMjMuNzc3MDEgMjMuNzc3MDEsLTIzLjc3NzAxeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTI5MzZmIiBzdHJva2Utd2lkdGg9IjcuNSIvPjxwYXRoIGQ9Ik0yMTAuOTU2ODUsMTk1LjUyMDQ5YzAsLTMxLjY2ODI1IDI1LjY3MjIsLTU3LjM0MDQ1IDU3LjM0MDQ1LC01Ny4zNDA0NWMzMS42NjgyNSwwIDU3LjM0MDQ0LDI1LjY3MjIgNTcuMzQwNDQsNTcuMzQwNDVjMCwzMS42NjgyNSAtMjUuNjcyMTksNTcuMzQwNDQgLTU3LjM0MDQ0LDU3LjM0MDQ0Yy0zMS42NjgyNSwwIC01Ny4zNDA0NSwtMjUuNjcyMTkgLTU3LjM0MDQ1LC01Ny4zNDA0NHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEyOTM2ZiIgc3Ryb2tlLXdpZHRoPSI3LjUiLz48L2c+PC9nPjwvZz48L3N2Zz4="

    const Line = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOTcuODE3MTQiIGhlaWdodD0iMTU5LjIzMDc3IiB2aWV3Qm94PSIwLDAsMTk3LjgxNzE0LDE1OS4yMzA3NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0MS4wOTE0MywtMTAwLjM4NDY4KSI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMzMzLjkwODU3LDE1Ny41NTA4NGwtMTg3LjgxNzE0LDQ0Ljg5ODMyIiBmaWxsPSJub25lIiBzdHJva2U9IiMxMjkzNmYiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNjUuMzg0NjYsMTA1LjM4NDY5bDE0OS4yMzA3NywxNDkuMjMwNzciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEyOTM2ZiIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIyNy4yNTgxOCwxODAuMDAwMDZjMCwtNy4wMzcxMyA1LjcwNDcyLC0xMi43NDE4NyAxMi43NDE4NywtMTIuNzQxODdjNy4wMzcxMywwIDEyLjc0MTg3LDUuNzA0NzIgMTIuNzQxODcsMTIuNzQxODdjMCw3LjAzNzEzIC01LjcwNDcyLDEyLjc0MTg3IC0xMi43NDE4NywxMi43NDE4N2MtNy4wMzcxMywwIC0xMi43NDE4NywtNS43MDQ3MiAtMTIuNzQxODcsLTEyLjc0MTg3eiIgZmlsbD0iIzE3YmU4ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIzMC4wNTQ2NSwxODAuMDAwMDZjMCwtNS40OTI2OCA0LjQ1MjcsLTkuOTQ1NCA5Ljk0NTQsLTkuOTQ1NGM1LjQ5MjY4LDAgOS45NDU0LDQuNDUyNyA5Ljk0NTQsOS45NDU0YzAsNS40OTI2OCAtNC40NTI3LDkuOTQ1NCAtOS45NDU0LDkuOTQ1NGMtNS40OTI2OCwwIC05Ljk0NTQsLTQuNDUyNyAtOS45NDU0LC05Ljk0NTR6IiBmaWxsPSIjMWFkN2ExIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PC9nPjwvc3ZnPg=="
    const Face = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxODMuODg4ODkiIGhlaWdodD0iMTgzLjg4ODg5IiB2aWV3Qm94PSIwLDAsMTgzLjg4ODg5LDE4My44ODg4OSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0OC4wNTU1NSwtODguMDU1NTUpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xODAuNTkzODEsMTE5Ljk5ODc3aDc1LjI4ODQ2YzEzLjcxMTA5LDAgMjAuNjI1LDYuOTEzOTEgMjAuNjI1LDIwLjYyNXY0My43NWMwLDEzLjcxMTA5IC02LjkxMzkxLDIwLjYyNSAtMjAuNjI1LDIwLjYyNWgtNzUuMjg4NDZjLTEzLjcxMTA4LDAgLTIwLjYyNSwtNi45MTM5MiAtMjAuNjI1LC0yMC42MjV2LTQzLjc1YzAsLTEzLjcxMTA4IDYuOTEzOTIsLTIwLjYyNSAyMC42MjUsLTIwLjYyNXoiIGZpbGw9IiMxYWQ3YTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIyMS45OTc3MSwxNTUuMDAxMjRoNzUuMjg4NDZjMTMuNzExMDksMCAyMC42MjUsNi45MTM5MiAyMC42MjUsMjAuNjI1djQzLjc1YzAsMTMuNzExMDggLTYuOTEzOTEsMjAuNjI1IC0yMC42MjUsMjAuNjI1aC03NS4yODg0NmMtMTMuNzExMDgsMCAtMjAuNjI1LC02LjkxMzkxIC0yMC42MjUsLTIwLjYyNXYtNDMuNzVjMCwtMTMuNzExMDggNi45MTM5MiwtMjAuNjI1IDIwLjYyNSwtMjAuNjI1eiIgZmlsbD0iIzFhZDdhMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjA0LjcyNDgsMjAzLjQxNTUzYzAsMCAwLC0yNi4wMDYxIDAsLTM0Ljg2MzM0YzAsLTcuMTE0MTggMy42MjM0LC0xMy4yMTc0MyAxMS4wMDk3LC0xMy4yMTc0M2MxMS44Mjg5NiwwIDU4LjcyMTA2LDAgNTguNzIxMDYsMGMwLDAgMCwyNy4xODIzIDAsMzUuOTg2NDVjMCw2LjYyNTA3IC0zLjU4NTgxLDEyLjA5NDMyIC0xMC40NjQzLDEyLjA5NDMyYy0xMS42OTAxNiwwIC01OS4yNjY0NiwwIC01OS4yNjY0NiwweiIgZmlsbD0iIzE3YmU4ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMTgwLjU5MzgxLDExOS45OTg3N2g3NS4yODg0NmMxMy43MTEwOSwwIDIwLjYyNSw2LjkxMzkxIDIwLjYyNSwyMC42MjV2NDMuNzVjMCwxMy43MTEwOSAtNi45MTM5MSwyMC42MjUgLTIwLjYyNSwyMC42MjVoLTc1LjI4ODQ2Yy0xMy43MTEwOCwwIC0yMC42MjUsLTYuOTEzOTIgLTIwLjYyNSwtMjAuNjI1di00My43NWMwLC0xMy43MTEwOCA2LjkxMzkyLC0yMC42MjUgMjAuNjI1LC0yMC42MjV6IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMjkzNmYiIHN0cm9rZS13aWR0aD0iNy41Ii8+PHBhdGggZD0iTTIyNC4xMTc3NSwxNTIuODgxMjJoNzUuMjg4NDZjMTMuNzExMDksMCAyMC42MjUsNi45MTM5MiAyMC42MjUsMjAuNjI1djQzLjc1YzAsMTMuNzExMDggLTYuOTEzOTEsMjAuNjI1IC0yMC42MjUsMjAuNjI1aC03NS4yODg0NmMtMTMuNzExMDgsMCAtMjAuNjI1LC02LjkxMzkxIC0yMC42MjUsLTIwLjYyNXYtNDMuNzVjMCwtMTMuNzExMDggNi45MTM5MiwtMjAuNjI1IDIwLjYyNSwtMjAuNjI1eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTI5MzZmIiBzdHJva2Utd2lkdGg9IjcuNSIvPjxwYXRoIGQ9Ik0xNDguMDU1NTYsMjcxLjk0NDQ0di0xODMuODg4ODloMTgzLjg4ODg5djE4My44ODg4OXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PC9nPjwvZz48L3N2Zz4="

    const PointLine = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNTkuMjMwNzciIGhlaWdodD0iMTU5LjIzMDc3IiB2aWV3Qm94PSIwLDAsMTU5LjIzMDc3LDE1OS4yMzA3NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2MC4zODQ2NywtMTAwLjM4NDY5KSI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMzE0LjYxNTQ0LDEwNS4zODQ3bC0xNDkuMjMwNzcsMTQ5LjIzMDc3IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMjkzNmYiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xOTguMzUyNjQsMjA4LjkwNTY5YzAsLTcuMDM3MTMgNS43MDQ3MiwtMTIuNzQxODcgMTIuNzQxODcsLTEyLjc0MTg3YzcuMDM3MTMsMCAxMi43NDE4Nyw1LjcwNDcyIDEyLjc0MTg3LDEyLjc0MTg3YzAsNy4wMzcxMyAtNS43MDQ3MiwxMi43NDE4NyAtMTIuNzQxODcsMTIuNzQxODdjLTcuMDM3MTMsMCAtMTIuNzQxODcsLTUuNzA0NzIgLTEyLjc0MTg3LC0xMi43NDE4N3oiIGZpbGw9IiMxN2JlOGUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yMDEuMTQ5MTEsMjA4LjkwNTY5YzAsLTUuNDkyNjggNC40NTI3LC05Ljk0NTQgOS45NDU0LC05Ljk0NTRjNS40OTI2OCwwIDkuOTQ1NCw0LjQ1MjcgOS45NDU0LDkuOTQ1NGMwLDUuNDkyNjggLTQuNDUyNyw5Ljk0NTQgLTkuOTQ1NCw5Ljk0NTRjLTUuNDkyNjgsMCAtOS45NDU0LC00LjQ1MjcgLTkuOTQ1NCwtOS45NDU0eiIgZmlsbD0iIzFhZDdhMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTI1Ni4xNjM3OCwxNTEuMDk0NTZjMCwtNy4wMzcxMyA1LjcwNDcyLC0xMi43NDE4NyAxMi43NDE4NywtMTIuNzQxODdjNy4wMzcxMywwIDEyLjc0MTg3LDUuNzA0NzIgMTIuNzQxODcsMTIuNzQxODdjMCw3LjAzNzEzIC01LjcwNDcyLDEyLjc0MTg3IC0xMi43NDE4NywxMi43NDE4N2MtNy4wMzcxMywwIC0xMi43NDE4NywtNS43MDQ3MiAtMTIuNzQxODcsLTEyLjc0MTg3eiIgZmlsbD0iIzE3YmU4ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTI1OC45NjAyNSwxNTEuMDk0NTZjMCwtNS40OTI2OCA0LjQ1MjcsLTkuOTQ1MzkgOS45NDU0LC05Ljk0NTM5YzUuNDkyNjgsMCA5Ljk0NTQsNC40NTI2OSA5Ljk0NTQsOS45NDUzOWMwLDUuNDkyNjggLTQuNDUyNyw5Ljk0NTQgLTkuOTQ1NCw5Ljk0NTRjLTUuNDkyNjgsMCAtOS45NDU0LC00LjQ1MjcgLTkuOTQ1NCwtOS45NDU0eiIgZmlsbD0iIzFhZDdhMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPjwvZz48L3N2Zz4="
    const PointFace = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxODMuODg4ODkiIGhlaWdodD0iMTgzLjg4ODg5IiB2aWV3Qm94PSIwLDAsMTgzLjg4ODg5LDE4My44ODg4OSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0OC4wNTU1NywtODguMDU1NTUpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xNDguMDU1NTgsMjcxLjk0NDQ0di0xODMuODg4ODloMTgzLjg4ODg5djE4My44ODg4OXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTE5MS40MTEwNCwxMjUuMTQzNWg5Ny4xNzgwNWMxNy42OTc0OSwwIDI2LjYyMTU3LDguOTI0MDggMjYuNjIxNTcsMjYuNjIxNTd2NTYuNDdjMCwxNy42OTc0OSAtOC45MjQwOCwyNi42MjE1NyAtMjYuNjIxNTcsMjYuNjIxNTdoLTk3LjE3ODA1Yy0xNy42OTc0OCwwIC0yNi42MjE1NywtOC45MjQwOSAtMjYuNjIxNTcsLTI2LjYyMTU3di01Ni40N2MwLC0xNy42OTc0OCA4LjkyNDA5LC0yNi42MjE1NyAyNi42MjE1NywtMjYuNjIxNTd6IiBmaWxsPSIjMWFkN2ExIiBzdHJva2U9IiMxMjkzNmYiIHN0cm9rZS13aWR0aD0iNy41Ii8+PHBhdGggZD0iTTIyMy42NzUzNywxODBjMCwtOS4wMTU4NSA3LjMwODc5LC0xNi4zMjQ2NiAxNi4zMjQ2NiwtMTYuMzI0NjZjOS4wMTU4NSwwIDE2LjMyNDY2LDcuMzA4NzkgMTYuMzI0NjYsMTYuMzI0NjZjMCw5LjAxNTg1IC03LjMwODc5LDE2LjMyNDY2IC0xNi4zMjQ2NiwxNi4zMjQ2NmMtOS4wMTU4NSwwIC0xNi4zMjQ2NiwtNy4zMDg3OSAtMTYuMzI0NjYsLTE2LjMyNDY2eiIgZmlsbD0iIzEyOTM2ZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjI3LjI1ODE5LDE4MC4wMDAwNmMwLC03LjAzNzEzIDUuNzA0NzIsLTEyLjc0MTg3IDEyLjc0MTg3LC0xMi43NDE4N2M3LjAzNzEzLDAgMTIuNzQxODcsNS43MDQ3MiAxMi43NDE4NywxMi43NDE4N2MwLDcuMDM3MTMgLTUuNzA0NzIsMTIuNzQxODcgLTEyLjc0MTg3LDEyLjc0MTg3Yy03LjAzNzEzLDAgLTEyLjc0MTg3LC01LjcwNDcyIC0xMi43NDE4NywtMTIuNzQxODd6IiBmaWxsPSIjMTdiZThlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjwvZz48L2c+PC9zdmc+"

    function ReturnTypeChoose(Value, Returntype) {
        if (Value === null || Value === undefined) return null
        switch(Returntype){
            case "X":
                return Value[0]
            case "Y":
                return Value[1]
            default:
                return "[" + Value + "]"
        }
    }
    function StringToBoolean(v) {
        return v === true || v === "true" || v === 1 || v === "1"
    }
    function floatEQ(A, B){
        return Math.abs(A - B) < 1e-9
    }

    function ThreelessCheck(a, b, c, EQ) {
        if (EQ){
            return a <= b && b <= c
        }else{
            return a < b && b < c
        }
    }

    function SQDistance(X1, Y1, X2, Y2) {
        return (X1 - X2)**2 + (Y1 - Y2)**2
    }

    function LineCalc(X1,Y1,X2,Y2){
        return (Y1 - Y2) / (X1 - X2)
    }

    function IsParallel(X1, Y1, X2, Y2, X3, Y3, X4, Y4) {
        return floatEQ((X2 - X1) * (Y4 - Y3) - (Y2 - Y1) * (X4 - X3), 0)
    }

    function IsInTriangle(Px, Py, X1, Y1, X2, Y2, X3, Y3, IncludeBorder) {// 三角形判断
        // 向量
        const v0x = X3 - X1;
        const v0y = Y3 - Y1;
        const v1x = X2 - X1;
        const v1y = Y2 - Y1;
        const v2x = Px - X1;
        const v2y = Py - Y1;

        // 点积
        const dot00 = v0x * v0x + v0y * v0y;
        const dot01 = v0x * v1x + v0y * v1y;
        const dot02 = v0x * v2x + v0y * v2y;
        const dot11 = v1x * v1x + v1y * v1y;
        const dot12 = v1x * v2x + v1y * v2y;

        // 重心坐标
        const denom = dot00 * dot11 - dot01 * dot01;
        if (floatEQ(denom, 0)) return false;   // 三点共线返回false
        const invDenom = 1 / denom;
        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        if (IncludeBorder){
            return (u >= 0) && (v >= 0) && (u + v <= 1);
        }else{
            return (u > 0) && (v > 0) && (u + v < 1);
        }
    }

    function IsCircleInSquare(R, Rx, Ry, X1, Y1, X2, Y2, IncludeBorder) {// 矩形圆形重叠
        let left = Math.min(X1, X2);
        let right = Math.max(X1, X2);
        let top = Math.min(Y1, Y2);
        let bottom = Math.max(Y1, Y2);

        // 1. 找到矩形上离圆心最近的点
        // 最近点的X坐标：如果圆心在矩形左侧，取left；在右侧取right；否则取圆心的X
        let closestX = Math.max(left, Math.min(Rx, right));
        // 最近点的Y坐标：如果圆心在矩形上方，取top；在下方取bottom；否则取圆心的Y
        let closestY = Math.max(top, Math.min(Ry, bottom));

        let dx = Rx - closestX;
        let dy = Ry - closestY;
        let distanceSquared = dx * dx + dy * dy;

        if (IncludeBorder){
            return distanceSquared <= R**2;
        }else{
            return distanceSquared < R**2;
        }
    }

    function isRectOverlap(X1, Y1, X2, Y2, X3, Y3, X4, Y4, IncludeBorder) {// 矩形重叠
        // 确保矩形坐标正确（左上角<右下角）
        const rect1 = { left: Math.min(X1, X2), top: Math.min(Y1, Y2), right: Math.max(X1, X2), bottom: Math.max(Y1, Y2) };
        const rect2 = { left: Math.min(X3, X4), top: Math.min(Y3, Y4), right: Math.max(X3, X4), bottom: Math.max(Y3, Y4) };

        if (IncludeBorder) {
            return !(rect1.right < rect2.left ||
                    rect1.left > rect2.right ||
                    rect1.bottom < rect2.top ||
                    rect1.top > rect2.bottom);
        } else {
            return !(rect1.right <= rect2.left ||
                    rect1.left >= rect2.right ||
                    rect1.bottom <= rect2.top ||
                    rect1.top >= rect2.bottom);
        }
    }

    function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  
        const dx1 = x2 - x1;
        const dy1 = y2 - y1;
        const dx2 = x4 - x3;
        const dy2 = y4 - y3;
        const dx3 = x3 - x1;
        const dy3 = y3 - y1;
        const denom = dx1 * dy2 - dy1 * dx2;
        if (floatEQ(Math.abs(denom), 0)) return null; // 平行或重合
        const t = (dx3 * dy2 - dy3 * dx2) / denom;

        return [
            x1 + t * dx1,
            y1 + t * dy1
        ];
    }

    class PositionJudgmentPlusmaincode {
        getInfo() {
            return {
                id: "PositionJudgmentPlus",
                name: "位置判断+",
                blockIconURI: Icon,
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "点判断",
                    },

                    {
                        opcode: "OnLine",
                        blockIconURI : PointLine,
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[Px][Py]是否在[X1][Y1],[X2][Y2]的[LineType]上",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            LineType: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "LineType"
                            }
                        }
                    },

                    {
                        opcode: "Collinear",
                        blockIconURI : PointLine,
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[X1][Y1],[X2][Y2],[X3][Y3]是否共线",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3,
                            },
                        }
                    },

                    {
                        opcode: "InTriangle",
                        blockIconURI : PointFace,
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[Px][Py]是否在[X1][Y1],[X2][Y2],[X3][Y3],[IncludeBorder]的三角形上",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        opcode: "InSquare",
                        blockIconURI : PointFace,
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[Px][Py]是否在[X1][Y1],[X2][Y2],[IncludeBorder]的矩形中",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        opcode: "InCircle",
                        blockIconURI : PointFace,
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "点[Px][Py]是否在[X][Y]半径[Radius],[IncludeBorder]的圆中",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Radius: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "线判断"
                    },
                    
                    {
                        opcode: "Intersect",
                        blockIconURI : Line,
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "直线[X1][Y1],[X2][Y2]是否与直线[X3][Y3],[X4][Y4]相交",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },

                            X4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                        }
                    },

                    {
                        opcode: "Parallel",
                        blockIconURI : Line,
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "直线[X1][Y1],[X2][Y2]是否与直线[X3][Y3],[X4][Y4]平行",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },

                            X4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0,
                            },
                            Y4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                        }
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "面判断"
                    },

                    {
                        opcode:"SquareInSquare",
                        blockIconURI : Face,
                        blockType:Scratch.BlockType.BOOLEAN,
                        text: "矩形[X1][Y1],[X2][Y2]是否与矩形[X3][Y3],[X4][Y4],[IncludeBorder]重叠",
                        arguments:{
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        opcode:"CircleInSquare",
                        blockIconURI : Face,
                        blockType:Scratch.BlockType.BOOLEAN,
                        text: "半径为[Radius],[Rx][Ry]的圆是否与矩形[X1][Y1],[X2][Y2],[IncludeBorder]重叠",
                        arguments:{
                            Radius: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3,
                            },
                            Rx: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Ry: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        opcode:"CircleInCircle",
                        blockIconURI : Face,
                        blockType:Scratch.BlockType.BOOLEAN,
                        text: "半径为[R1],[Rx1][Ry1]的圆是否与半径为[R2],[Rx2][Ry2],[IncludeBorder]的圆重叠",
                        arguments:{
                            R1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4,
                            },
                            R2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4,
                            },
                            Rx1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Ry1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Rx2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Ry2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            IncludeBorder: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "IncludeBorder"
                            }
                        }
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "额外拓展块",
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "点",
                    },

                    {
                        opcode: "Center",
                        blockIconURI : PointLine,
                        blockType: Scratch.BlockType.REPORTER,
                        text: "点[X1][Y1],[X2][Y2]的中点的[ReturnType]",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5,
                            },
                            ReturnType: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ReturnType"
                            }
                        }
                    },

                    {
                        opcode: "Distance",
                        blockIconURI : PointLine,
                        blockType: Scratch.BlockType.REPORTER,
                        text: "点[X1][Y1],[X2][Y2]的距离",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                        }
                    },

                    {
                        opcode: "PointLineDistance",
                        blockIconURI : PointLine,
                        blockType: Scratch.BlockType.REPORTER,
                        text: "点[Px][Py]到直线[X1][Y1],[X2][Y2]的距离",
                        arguments: {
                            Px: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Py: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -3,
                            },

                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                        }
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "线",
                    },

                    {
                        opcode: "Calc",
                        blockIconURI : Line,
                        blockType: Scratch.BlockType.REPORTER,
                        text: "直线[X1][Y1],[X2][Y2]的斜率",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                        }
                    },

                    {
                        opcode: "IntersectPoint",
                        blockIconURI : Line,
                        blockType: Scratch.BlockType.REPORTER,
                        text: "直线[X1][Y1],[X2][Y2]与直线[X3][Y3],[X4][Y4]的交点的[ReturnType]",
                        arguments: {
                            X1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -1,
                            },
                            Y1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },

                            X2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },
                            Y2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            X3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            Y3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -2,
                            },

                            X4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2,
                            },
                            Y4: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },

                            ReturnType: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ReturnType"
                            }
                        }
                    },
                ],
                
                menus:{
                    IncludeBorder:{
                        acceptReporters: true,
                        items:[
                            {
                                text: "包含边界",
                                value: "true"
                            },
                            {
                                text: "不包含边界",
                                value: "false"
                            }
                        ]
                    },

                    LineType:{
                        acceptReporters: true,
                        items:[
                            {
                                text: "直线",
                                value: "straight"
                            },
                            {
                                text: "线段",
                                value: "segment"
                            }
                        ]
                    },

                    ReturnType:{
                        acceptReporters: true,
                        items:[
                            "X",
                            "Y",
                            "XY"
                        ]
                    }
                }
            };
        }
    
    //-----------块定义-----------//

    //---------点判断---------//

        InSquare(args) {
            const ICB = StringToBoolean(args.IncludeBorder)
            return ThreelessCheck(Math.min(args.X1, args.X2), args.Px, Math.max(args.X1, args.X2), ICB) && ThreelessCheck(Math.min(args.Y1, args.Y2), args.Py, Math.max(args.Y1, args.Y2), ICB)
        }

        InCircle(args) {
            return ThreelessCheck(-1 , SQDistance(args.X, args.Y, args.Px, args.Py) , args.Radius**2 , StringToBoolean(args.IncludeBorder))
        }

        InTriangle(args) {
            return IsInTriangle(args.Px, args.Py, args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, StringToBoolean(args.IncludeBorder))
        }

        OnLine(args) {
            // 两点重合，直线/线段无定义
            if (floatEQ(args.X1, args.X2) && floatEQ(args.Y1, args.Y2)) return false;

            // 叉积判三点共线：(P - A) × (B - A) = 0
            const cross = (args.Px - args.X1) * (args.Y2 - args.Y1)
                        - (args.Py - args.Y1) * (args.X2 - args.X1);
            if (!floatEQ(cross, 0)) return false;

            // 直线：共线即在直线上
            if (args.LineType === "straight") return true;

            // 线段：在两端点之间
            if (args.LineType === "segment") {
                return ThreelessCheck(Math.min(args.X1, args.X2), args.Px, Math.max(args.X1, args.X2), true)
                    && ThreelessCheck(Math.min(args.Y1, args.Y2), args.Py, Math.max(args.Y1, args.Y2), true);
            }

            return false;
        }

        Collinear(args) {
            const cross = (args.X1 - args.X2) * (args.Y3 - args.Y2)
                        - (args.Y1 - args.Y2) * (args.X3 - args.X2);
            return floatEQ(cross, 0)
        }

        //---------线判断---------//

        Intersect(args) {
            return !IsParallel(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4)
        }

        Parallel(args) {
            return IsParallel(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4)
        }

        //---------面判断---------//

        SquareInSquare(args) {
            return isRectOverlap(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4, StringToBoolean(args.IncludeBorder))
        }

        CircleInSquare(args) {
            return IsCircleInSquare(args.Radius, args.Rx, args.Ry, args.X1, args.Y1, args.X2, args.Y2, StringToBoolean(args.IncludeBorder))
        }

        CircleInCircle(args) {
            switch(StringToBoolean(args.IncludeBorder)) {
                case false:
                    return SQDistance(args.Rx1, args.Ry1, args.Rx2, args.Ry2) < (args.R1 + args.R2)**2
                case true:
                    return SQDistance(args.Rx1, args.Ry1, args.Rx2, args.Ry2) <= (args.R1 + args.R2)**2
                default:
                    return false
            }
        }

        //---------额外拓展块---------//
        Calc(args) {
            return LineCalc(args.X1, args.Y1, args.X2, args.Y2)
        }

        Center(args) {
            return ReturnTypeChoose([(args.X1 + args.X2)/2,(args.Y1 + args.Y2)/2], args.ReturnType)
        }

        Distance(args) {
            return Math.sqrt(SQDistance(args.X1, args.Y1, args.X2, args.Y2))
        }

        PointLineDistance(args) {
            if (floatEQ(args.X1, args.X2) && floatEQ(args.Y1, args.Y2)){
                return Math.sqrt(SQDistance(args.Px, args.Py, args.X1, args.Y1))
            }else {
                const v = [args.X2 - args.X1, args.Y2 - args.Y1]
                const a = [args.X2 - args.Px, args.Y2 - args.Py]
                return Math.abs(v[0] * a[1] - v[1] * a[0]) / Math.sqrt(v[0]**2 + v[1]**2) 
            }
        }

        IntersectPoint(args) {
            if (IsParallel(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4)) return null
            return ReturnTypeChoose(lineIntersection(args.X1, args.Y1, args.X2, args.Y2, args.X3, args.Y3, args.X4, args.Y4), args.ReturnType)
        }
    }
    Scratch.extensions.register(new PositionJudgmentPlusmaincode());
})();