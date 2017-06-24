package nacam403.rest;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

public class PersonResource {

    @Context
    private HttpServletRequest request;

    @Context
    private HttpServletResponse response;

    @GET
    @Path("/persons")
    @Produces("application/json; charset=utf-8")
    public Response list() {
        String json = "{ \"persons\": [ { \"name\": \"Bob\" } ] }";
        return Response.ok(json).build();
    }

    @GET
    @Path("/persons/dispatch-sample")
    public void dispatchToHtml() throws ServletException, IOException {
        // JAX-RSのメソッドから、普通のサーブレットに無理やり飛ばしてみる実験。
        response.setHeader("X-TEST", "fromREST"); // JAX-RS経由であることがわかるように目印をつけてみる。
        request.getRequestDispatcher("/sample").forward(request, response);
    }

}
