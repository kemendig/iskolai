   M S B A M L   `   `   `  ����F  BFutoverseny, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null)clr-namespace:FutoversenyFutoverseny  5   	       Futoverseny.MainWindow   5   	   W SPresentationCore, Version=7.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=7.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=7.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=7.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=7.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   +localclr-namespace:Futoverseny     5   	     � Title$  
MainWindow��5   	   $	��450��6   $	��800��6)   .��5	      �  � ColumnDefinitions 5
   
   �� 5      �� 5      .+�5   
   �� $��0��6   .+�5      �� $��	Rajtszám��6   $	��200��6'   $
��Left=�63   �� 5      -   5        $��tbxrajtszam��5   :   $��
Pl.: 43452��6   ${�False��6(   $	��200��6M   $
��Left=�6Y   �� 5      $
��Név��6   �� 5      -   5        $��tbxnev��5      �� 5      $��E-mail cím��6   �� 5      -   5        $��tbxemail��5      $��futoverseny@gmail.com��6&   �� 5      $��Telefonszám��6   �� 5      -   5        $��
tbxtelszam��5      �� 5      $��Ország��6   �� 5      -   5        $��	tbxorszag��5      �� 5      $/��)Táv (Csak egy távot lehet választani!)��6   �� 5      -   5        $��cbxtav��5       �� Text$
 Táv��6%   �� 5      $'��!A versenyen elért időeredmény:��6   �� 5      -   5        $��tbxversenyido��5      $��pl.: 1:50:02��6+   �� 5      -   5        $��btnxgeneral��5   3   $��Rajtszám generálása��6   $	��150��6F   $
��Left=�6R   6m   �� 5      -	   5        $��	btnmentes��5   4   $��Új versenyző mentése��6   $	��200��6E   $��Center=�6Q   $��0,40,0,0q�6n   6�   5      �� 5    
   $��1��6   .+�5!      �� $3��-Név alapján kiválaszthatja a versenyzőket��6   $��5,0,0,0q�6H   �� 5"      -
   5         ��Name$ cbxkivalasztasnevalapjan��5"      $��5,0,0,0q�6v   �� 5#      -   5         ��Name$ 
tblxkiiras��5#      $��5,0,0,0q�6,   5$      5%      5&      