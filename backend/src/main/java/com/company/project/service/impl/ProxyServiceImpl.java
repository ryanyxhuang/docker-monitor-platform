package com.company.project.service.impl;

import com.alibaba.fastjson.JSONObject;

import com.company.project.service.ProxyService;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ProxyServiceImpl implements ProxyService
{
	@Override
	public ResponseEntity<Object> jsonTypeProxy(String url, HttpServletRequest request, Map<String, Object> params) {
		RestTemplate client = new RestTemplate();

		HttpMethod method = HttpMethod.resolve(request.getMethod());
		HttpEntity entity;
		if (request.getQueryString()!=null) {
			url = url + "?" + request.getQueryString();
		}
		if (method==HttpMethod.GET) {
			entity = new HttpEntity<>(null, null);
		} else {
			String requestStr =new JSONObject(params).toString();

			HttpHeaders headers = new HttpHeaders();
			MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
			headers.setContentType(type);
			headers.add("Accept", MediaType.APPLICATION_JSON.toString());

			entity = new HttpEntity<>(requestStr, headers);
		}

		ResponseEntity<Object> responseEntity = client.exchange(url, method, entity, Object.class);
		return responseEntity;
	}
}
