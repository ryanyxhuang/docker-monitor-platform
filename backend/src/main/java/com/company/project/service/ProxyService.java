package com.company.project.service;

import com.company.project.core.Service;
import com.company.project.model.Endpoint;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface ProxyService {
    public ResponseEntity<Object> jsonTypeProxy(String url, HttpServletRequest request, Map<String, Object> params);
}
