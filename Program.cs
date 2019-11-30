using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace watch_together
{
    public class Program
    {
        private static string configFile;
        public static void Main(string[] args)
        {
            CreateConfigIfNotExists();
            //CreateWebHostBuilder(args).UseUrls(new string[] { "http://0.0.0.0:5000" }).Build().Run();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddIniFile(configFile, optional: false, reloadOnChange: true);
                    config.AddInMemoryCollection(new Dictionary<string, string>{
                        {"config", Path.GetDirectoryName(configFile)},
                        {"api", "http://localhost:8080/"}
                    });
                }).UseStartup<Startup>();

        public static void CreateConfigIfNotExists()
        {
            // Get the user's default video directory
            var sysVideoDir = System.Environment.GetFolderPath(
                    Environment.SpecialFolder.MyVideos,
                    Environment.SpecialFolderOption.Create);

            // Get the user's config directory
            var sysConfigDir = System.Environment.GetFolderPath(
                    Environment.SpecialFolder.ApplicationData,
                    Environment.SpecialFolderOption.Create);

            configFile = Path.Combine(sysConfigDir, "watch-together", "config.ini");

            if (File.Exists(configFile)) return;

            // Make sure the directory exists by creating it by stripping file off configFile path
            Directory.CreateDirectory(Path.GetDirectoryName(configFile));
            Console.WriteLine("Writing initial config file...");

            File.WriteAllText(configFile, "[library]\n" +
                                          "directory=\""
                                          + sysVideoDir
                                          + "\"\n"
                                          + "database = \"movies.json\"\n\n"
                                          + "[server]\n"
                                          + "port = 8080");
        }
    }
}