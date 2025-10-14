Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd /d C:\Publisoft\Site && python -m http.server 7777", 0
Set WshShell = Nothing