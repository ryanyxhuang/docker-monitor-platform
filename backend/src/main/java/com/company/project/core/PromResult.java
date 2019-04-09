package com.company.project.core;

import java.util.Map;

/**
 * Created by hyx on 2019/4/6.
 */
public class PromResult {
    private String status;
    private Map<String, Object> data;

    public PromResult setStatus(String status) {
        this.status = status;
        return this;
    }

    public PromResult setData(Map<String, Object> data) {
        this.data = data;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public boolean isSuccess() {
        return status.equals("success");
    }

    public String getResultType() {
        return data.get("resultType").toString();
    }

    public Object getResult() {
        return data.get("result");
    }
}
