package com.company.project.core;

import java.util.Map;

/**
 * Created by hyx on 2019/6/3.
 */
public class RequestUtil {
    public String getJsonAttr(Map<String, Object> params, String key) {
        String ret = "";
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            if (entry.getKey() == key) {
                ret = entry.getValue().toString();
            }
        }
        return ret;
    }
}
