using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Net.Http;
using System.Web.Script.Serialization;
using HiveStudioSensor.Models;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

namespace HiveStudioSensor
{
    class Communication
    {
        private string sendInfEndPoint = String.Empty;
        private string getInfEndPoint = String.Empty;
        private string authEndPoint = String.Empty;
        private string username = String.Empty;
        private string password = String.Empty;
        private string token = String.Empty;

        public Communication()
        {
            getInfEndPoint = ConfigurationManager.AppSettings["getInfEndpoint"];
            sendInfEndPoint = ConfigurationManager.AppSettings["sendInfEndpoint"];
            authEndPoint = ConfigurationManager.AppSettings["authEndPoint"];
            username = ConfigurationManager.AppSettings["username"];
            password = ConfigurationManager.AppSettings["password"];
            this.GetToken();
        }



        private void GetToken()
        {
            try
            {
                Console.WriteLine("INFO: Getting token for user " + this.username + "\n\n");
                HttpClient client = new HttpClient();
                Authentication credentials = new Authentication();
                credentials.username = this.username;
                credentials.password = this.password;
                var json = new JavaScriptSerializer().Serialize(credentials);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage httpresp = client.PostAsync(this.authEndPoint, content).Result;
                string resp = httpresp.Content.ReadAsStringAsync().Result;
                var data = (JObject)JsonConvert.DeserializeObject(resp);
                this.token = data["data"]["token"].Value<string>();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("INFO: Token received from API:\n");
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine(this.token + "\n\n");
            }
            catch(Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("ERROR GETTING TOKEN: " + ex.Message + "\n\n");
                Console.ForegroundColor = ConsoleColor.White;
            }
            
        }

		public void GetHivesInfo()
        {
            try
            {
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", this.token);
                HttpResponseMessage httpresp = client.GetAsync(this.getInfEndPoint).Result;
                string resp = httpresp.Content.ReadAsStringAsync().Result;
                var data = (JObject)JsonConvert.DeserializeObject(resp);
                var _data = data["data"].Value<JArray>();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("INFO: Hives info getted from API:\n");
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine(_data + "\n\n");
                this.SendHivesInfo(_data);
            }
            catch(Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("ERROR HIVES INFORMATION: " + ex.Message + "\n\n");
                Console.ForegroundColor = ConsoleColor.White;
            }
           
        }

        private void SendHivesInfo(JArray _data)
        {
			try
            {
                foreach (JToken token in _data)
                {
                    token["humidity"] = new Random(Guid.NewGuid().GetHashCode()).Next(1, 100);           
                    token["temperature"] = new Random(Guid.NewGuid().GetHashCode()).Next(1, 100);
                    token["beevolume"] = new Random(Guid.NewGuid().GetHashCode()).Next(10000, 100000);
                }
                List<HiveInf> items = ((JArray)_data).Select(x => new HiveInf
                {
                    hiveId = (int)x["hiveId"],
                    temperature = (int)x["temperature"],
                    humidity = (int)x["humidity"],
                    beevolume = (int)x["beevolume"],
                    userId = (int)x["userId"]
                }).ToList();
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", this.token);
                var senddata = new JavaScriptSerializer().Serialize(items);
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("INFO: Sending hives information to API:\n");
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine(_data + "\n\n");
                StringContent content = new StringContent(senddata, Encoding.UTF8, "application/json");
                HttpResponseMessage httpresp = client.PostAsync(this.sendInfEndPoint, content).Result;
            }
			catch(Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("ERROR SENDING HIVES INFORMATION: " + ex.Message + "\n\n");
                Console.ForegroundColor = ConsoleColor.White;
            }
           
        }

		private int GetRandomNumber(int min, int max, string typevalue = "")
        {

            Random random = null;
            if (typevalue == "temperature")
            {
                random = new Random(DateTime.Now.Millisecond);
            }
            else
            {
                random = new Random();
            }
            return random.Next(min, max);
        }

    }
}
