import routes from "./routes/main";

function route(name) {
   try {
      let getRoute = routes.filter(function (route) {
         if (route.name == name)
            return route;
         else if (route.routes) {
            let found = nestedRoute(name, route.routes)
            if (found)
               return found;
         }

         return false;
      })

      //flatten the array
      getRoute = getRoute.flat(Infinity)

      return getRoute[0].path
   } catch (error) {
      return false
   }
}

function nestedRoute(name, routes) {
   let getRoute = routes.map(function (route) {
      if (route.name == name)
         return route;
      else if (route.routes)
         return nestedRoute(name, route.routes)

      return false;
   })

   return getRoute;
}

export default route