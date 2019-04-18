package com.company.project.controller;

import com.alibaba.fastjson.JSONObject;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/elastic")
public class ElasticController {

    private RestTemplate client = new RestTemplate();

    @Value("${elasticUrl}")
    private String elasticUrl;

    @RequestMapping(value = "**") public Result elastic(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> params) {
        HttpMethod method = HttpMethod.resolve(request.getMethod());
        String requestStr =new JSONObject(params).toString();

        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());

        HttpEntity entity = new HttpEntity<>(requestStr, headers);

        String newURI = "http://" + elasticUrl + request.getRequestURI().replaceFirst("/elastic", "");

        try {
            ResponseEntity<Object> result = client.exchange(newURI, method, entity, Object.class);
            return ResultGenerator.genSuccessResult(result.getBody());
        } catch (HttpClientErrorException e) {
            return ResultGenerator.genFailResult(e.getStatusCode().value(), e.getStatusText());
        }
    }
}

