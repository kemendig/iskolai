using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls.Ribbon;

namespace Futoverseny
{
    class Versenyzo
    {
        private string rajtszam;
        private string nev;
        private string email;
        private string telszam;
        private string orszag;
        private double tav;
        private string versenyido;

        public string Rajtszam { get => rajtszam;  }
        public string Nev { get => nev; }
        public string Email { get => email; set => email = value; }
        public string Telszam { get => telszam; set => telszam = value; }
        public string Orszag { get => orszag; set => orszag = value; }
        public double Tav { get => tav; set => tav = value; }
        public string Versenyido { get => versenyido;}

        public Versenyzo(string rajtszam, string nev, string email, string telszam, string orszag, double tav, string versenyido)
        {
            this.rajtszam = rajtszam;
            this.nev = nev;
            this.email = email;
            this.telszam = telszam;
            this.orszag = orszag;
            this.tav = tav;
            this.versenyido = versenyido;
        }
        public Versenyzo(string sor)
        {
            string[] bontas = sor.Split(';');
            rajtszam = bontas[0];
            nev = bontas[1];
            email = bontas[2];
            telszam = bontas[3];
            orszag = bontas[4];
            tav = double.Parse(bontas[5]);
            versenyido = bontas[6];
        }
        public override string ToString()
        {
            return $"Rajtszám: {rajtszam}\nNév: {nev}\nEmail: {email}\nTelefonszám: {telszam}\nOrszág: {orszag}\nTáv: {tav}\nVersenyidő: {versenyido}";
        }

        public string AllomanybaToString()
        {
            return $"{rajtszam};{nev};{email};{telszam};{orszag};{tav};{versenyido}";
        }
    }
}
