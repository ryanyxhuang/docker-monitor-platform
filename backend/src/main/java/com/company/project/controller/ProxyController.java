package com.company.project.controller;

import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Endpoint;
import com.company.project.service.EndpointService;
import com.company.project.service.ProxyService;
import com.company.project.service.impl.ProxyServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;


@RestController
@RequestMapping("/proxy")
public class ProxyController {
    @Resource
    private EndpointService endpointService;
    private ProxyService proxyService = new ProxyServiceImpl();

    @RequestMapping(value = "/docker/**")
    public Result dockerProxy(HttpServletRequest request, HttpServletResponse response, @RequestBody(required = false) Map<String, Object> params) {
        String ip = null;
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            if (entry.getKey() == "proxyTargetIp") {
                ip = entry.getValue().toString();
            }
        }
        if (ip == null) {
            return ResultGenerator.genFailResult(400, "proxyTargetIp值不为空");
        }

        String dockerUrl = ip + ":2376";

        String newURI = "http://" + dockerUrl + request.getRequestURI().replaceFirst("^(.+?)/docker", "");

        ResponseEntity<Object> responseEntity = proxyService.jsonTypeProxy(newURI, request, params);

        return ResultGenerator.genSuccessResult(responseEntity.getBody());
    }
}
