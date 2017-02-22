Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
    Select-Object @{name="name";expression={$_.DisplayName}},
                  @{name="installedVersion";expression={$_.DisplayVersion}},
                  @{name="publisher";expression={$_.Publisher}},
                  @{name="installDate";expression={$_.InstallDate}} |
    Where-Object {$_.name -ne $null} |
    ConvertTo-Json
