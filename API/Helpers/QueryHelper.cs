using System;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers;

public static class QueryHelper
{
     public static string LinqToQuery<T>(IQueryable<T> query)
    {
        if (query == null)
            throw new ArgumentNullException(nameof(query));

        return query.ToQueryString();
    }

}
