using NHibernate.Tool.hbm2ddl;
using NHibernate;
using System.Reflection;
using NHibernate.Cfg;
using NHibernate.Dialect;

namespace API.Extensions
{
    public static class NHibernateExtensions
    {
        public static IServiceCollection AddNHibernate(
            this IServiceCollection services,
            string connectionString, Action<ISessionFactory, Configuration> mappings)
        {

            var configuration = new Configuration();
            configuration.DataBaseIntegration(db =>
            {
                db.ConnectionString = connectionString;
                db.Driver<NHibernate.Driver.OracleManagedDataClientDriver>();
                db.Dialect<Oracle10gDialect>();
                db.LogSqlInConsole = true;
            });
            configuration.AddAssembly(Assembly.GetExecutingAssembly());


            new SchemaExport(configuration)
             .SetOutputFile("migration")
            .Execute(false, true, false);

            var sessionFactory = configuration.BuildSessionFactory();
            services.AddSingleton(sessionFactory);
            services.AddScoped(factory => factory.GetService<ISessionFactory>().OpenSession());

            mappings(sessionFactory, configuration);

            return services;

        }
    }
}
