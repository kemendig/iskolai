using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Aknamező0422
{
    /// <summary>
    /// Interaction logic for AknamezoWindow.xaml
    /// </summary>
    public partial class AknamezoWindow : Window
    {
        const int MERET = 20;
        static bool[,] aknak;
        public AknamezoWindow()
        {
            InitializeComponent();
            NezetInit();
            AdatInit();
        }

        private static void AdatInit()
        {
            Random random = new Random();
            aknak = new bool[MainWindow.sor, MainWindow.oszlop];
            for (int i = 0; i < MainWindow.sor; i++)
            {
                for (int j = 0; j < MainWindow.oszlop; j++)
                {
                    aknak[i, j] = random.Next(2) == 1;
                }
            }
        }

        private void NezetInit()
        {
            for (int i = 0; i < MainWindow.sor; i++)
            {
                for (int j = 0; j < MainWindow.oszlop; j++)
                {
                    Button ujButton = new Button();
                    ujButton.Height = MERET;
                    ujButton.Width = MERET;
                    ujButton.HorizontalAlignment = HorizontalAlignment.Left;
                    ujButton.VerticalAlignment = VerticalAlignment.Top;
                    ujButton.Margin = new Thickness(j * MERET, i * MERET, 0, 0);
                    ujButton.Name = $"btn_{i}_{j}";
                    ujButton.Click += Button_Click;
                    grdAknamezo.Children.Add(ujButton);
                }
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            int elems = int.Parse((sender as Button).Name.Split('_')[1]);
            int elemo = int.Parse((sender as Button).Name.Split('_')[2]);
            //MessageBox.Show($"{elems}.sor, {elemo}. oszlop");
            if (aknak[elems,elemo])
            {
                foreach (var gomb in grdAknamezo.Children)
                {
                   if(aknak[int.Parse((gomb as Button).Name.Split('_')[1]), int.Parse((gomb as Button).Name.Split('_')[2])])
                    {
                        (gomb as Button).Content = "*";
                    }
                    else
                    {
                        (gomb as Button).Content = "o";
                    }

                }
                //(sender as Button).Content = "*";
            }
            else
            {
                (sender as Button).Content = "o";
            }
        }
    }
}
