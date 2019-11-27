using System.IO;
using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace watch_together
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateConfigIfNotExists();
            CreateWebHostBuilder(args).UseUrls(new string[] { "http://0.0.0.0:5000" }).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddIniFile("config.ini", optional: true, reloadOnChange: true);
                }).UseStartup<Startup>();

        public static void CreateConfigIfNotExists()
        {
            var homeDir = System.Environment.GetEnvironmentVariable("HOME");
            var configFile = Path.Join(homeDir, ".config", "watch-together", "config.ini");
            if (!File.Exists(configFile))
            {
                File.WriteAllText(configFile, @"
                    [library]
                    directory = ""/home/evan/videos""

                    [server]
                    port = 8080");
            }
        }
    }
}
