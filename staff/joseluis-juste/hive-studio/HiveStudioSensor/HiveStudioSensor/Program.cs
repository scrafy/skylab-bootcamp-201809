using System.Threading;
using System;
using System.Configuration;

namespace HiveStudioSensor
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("/****************************LAUNCHING THE SENSORS***************************/");
            Console.WriteLine("\n\n");
            Console.ForegroundColor = ConsoleColor.White;
            Communication com = new Communication();
            while (true)
            {
                Thread.Sleep(int.Parse(ConfigurationManager.AppSettings["frecuency"]));
                com.GetHivesInfo();
            }
        }

        
    }
}
