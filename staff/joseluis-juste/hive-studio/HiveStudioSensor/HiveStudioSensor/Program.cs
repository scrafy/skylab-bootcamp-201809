using System.Threading;
using System;

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
                Thread.Sleep(5000);
                com.GetHivesInfo();
            }
        }

        
    }
}
