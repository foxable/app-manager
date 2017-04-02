
$l1 = Get-ItemProperty HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*
$l2 = Get-ItemProperty HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*
$l3 = Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*

$l1 + $l2 + $l3 |
Select-Object @{name="name";expression={$_.DisplayName}},
              @{name="installedVersion";expression={$_.DisplayVersion}} |
Where-Object {$_.name -ne $null} |
Sort-Object -Property name -Unique |
ConvertTo-Json