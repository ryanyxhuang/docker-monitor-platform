package com.company.project.controller;

import com.alibaba.fastjson.JSON;
import com.company.project.core.PromResult;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Endpoint;
import com.company.project.service.EndpointService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/endpoint")
public class EndpointController {
    @Resource
    private EndpointService endpointService;
    private RestTemplate client = new RestTemplate();

    @PostMapping
    public Result add(@RequestBody Endpoint endpoint) {
        endpointService.save(endpoint);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable String id) {
        endpointService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody Endpoint endpoint) {
        endpointService.update(endpoint);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        Endpoint endpoint = endpointService.findById(id);
        return ResultGenerator.genSuccessResult(endpoint);
    }

    @GetMapping
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        List<Endpoint> list = endpointService.findAll();
        return ResultGenerator.genSuccessResult(list);
    }

    @RequestMapping(value = "/{id}/docker/**")
    public Result dockerProxy(HttpServletRequest request, HttpServletResponse response, @PathVariable String id) {
        Endpoint endpoint = endpointService.findById(id);

        HttpMethod method = HttpMethod.resolve(request.getMethod());

//        MultiValueMap<String, Object> postParameters = new LinkedMultiValueMap<>();
//        for (Map.Entry<String, Object> entry : params.entrySet()) {
//            postParameters.add(entry.getKey(), entry.getValue());
//        }

        String parameterName;
        MultiValueMap<String, Object> postParameters = new LinkedMultiValueMap<>();
        for (Enumeration e = request.getParameterNames(); e.hasMoreElements(); ) {
            parameterName = (String) e.nextElement();
            postParameters.add(parameterName, request.getParameter(parameterName));
        }

        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(postParameters, null);

        String newURI = "http://" + endpoint.getDockerUrl() + request.getRequestURI().replaceFirst("^(.+?)/docker", "");
        ResponseEntity<Object> responseEntity = client.exchange(newURI, method, entity, Object.class);
        return ResultGenerator.genSuccessResult(responseEntity.getBody());
    }

    @RequestMapping(value = "/{id}/prom/**")
    public Result dockerProm(HttpServletRequest request, HttpServletResponse response, @PathVariable String id, @RequestBody Map<String, Object> params) {
        Endpoint endpoint = endpointService.findById(id);

        HttpMethod method = HttpMethod.resolve(request.getMethod());

        String newURI;
        HttpEntity<MultiValueMap<String, Object>> entity;

        MultiValueMap<String, String> header =  new LinkedMultiValueMap();
        header.set("authorization", request.getHeader("authorization"));
        header.set("content-type", "multipart/form-data;charset=utf-8");

        if (method==HttpMethod.GET) {
            entity = new HttpEntity<>(null, header);
            newURI = "http://" + endpoint.getPromUrl() + request.getRequestURI().replaceFirst("^(.+?)/prom", "") + "?" + request.getQueryString();
        } else {
            MultiValueMap<String, Object> postParameters = new LinkedMultiValueMap<>();

            for (Map.Entry<String, Object> entry : params.entrySet()) {
                postParameters.add(entry.getKey(), entry.getValue());
            }

            entity = new HttpEntity<>(postParameters, header);
            newURI = "http://" + endpoint.getPromUrl() + request.getRequestURI().replaceFirst("^(.+?)/prom", "");
        }

        PromResult promResult = client.exchange(newURI, method, entity, PromResult.class).getBody();

        if (promResult.isSuccess()) {
            return ResultGenerator.genSuccessResult(promResult.getData());
        }
        return ResultGenerator.genFailResult(500, "获取prom数据失败:" + promResult.getStatus());
    }
}
