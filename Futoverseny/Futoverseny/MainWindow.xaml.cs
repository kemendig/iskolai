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
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.IO;
using System.Net.Http.Headers;

namespace Futoverseny
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        internal static List<double> tavok = new List<double>();
        internal static List<string>orszagok = new List<string>();
        internal static List<Versenyzo> versenyzok = new List<Versenyzo>();
        internal static List<string> nevek = new List<string>();
        public MainWindow()
        {
            string[] sorok = File.ReadAllLines("tav.txt");
            for (int i = 0; i < sorok.Length; i++)
            {
                tavok.Add(double.Parse(sorok[i]));
            }
            string[] Osorok = File.ReadAllLines("orszagok.txt");
            for (int i = 0;i < Osorok.Length; i++)
            {
                orszagok.Add(Osorok[i]);
            }
            string[] Vsorok = File.ReadAllLines("versenyzok.txt");
            for (int i = 0; i<Vsorok.Length; i++)
            {
                versenyzok.Add(new Versenyzo(Vsorok[i]));
            }
            foreach (var versenyzo in versenyzok)
            {
                nevek.Add(versenyzo.Nev);
            }
            InitializeComponent();
            cbxtav.ItemsSource = tavok;
            tbxorszag.ItemsSource = orszagok;
            cbxkivalasztasnevalapjan.ItemsSource = nevek;
            
        }

        private void btnxgeneral_Click(object sender, RoutedEventArgs e)
        {
            tbxrajtszam.Text = Kodgeneralo();
        }
        private static string Kodgeneralo()
        {
            Random rnd = new Random();
            string kod ="";
            for (int i = 0; i < 5; i++)
            {
                kod += rnd.Next(10);
            }
            return kod;
        }

        private void btnmentes_Click(object sender, RoutedEventArgs e)
        {
            string ujrajtszam = tbxrajtszam.Text;
            string ujnev = tbxnev.Text;
            string ujemail = tbxemail.Text;
            string ujtelefonszam = tbxtelszam.Text;
            string ujorszag = tbxorszag.SelectedItem.ToString();
            double ujtav = cbxtav.SelectedItem != null ? Convert.ToDouble(cbxtav.SelectedItem) : 0.0;
            string ujversenyido = tbxversenyido.Text;
            versenyzok.Add(new Versenyzo(ujrajtszam, ujnev, ujemail, ujtelefonszam, orszag: ujorszag, tav: ujtav, versenyido: ujversenyido));
            nevek.Add(ujnev);
            cbxkivalasztasnevalapjan.ItemsSource = nevek;
        }

        private void cbxkivalasztasnevalapjan_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cbxkivalasztasnevalapjan.SelectedItem != null)
            {
                string valasztottNev = cbxkivalasztasnevalapjan.SelectedItem.ToString();
                Versenyzo valasztottVersenyzo = versenyzok.FirstOrDefault(v => v.Nev == valasztottNev);
                if (valasztottVersenyzo != null)
                {
                    tblxkiiras.Text = valasztottVersenyzo.ToString();
                }
            }
        }

    }
}
