package com.company.project.dao;

import com.company.project.core.BaseMapper;
import com.company.project.model.Endpoint;
import com.company.project.model.SwarmMngtEndpoint;

import java.util.List;

public interface SwarmMngtEndpointMapper extends BaseMapper<SwarmMngtEndpoint, String> {
    List<SwarmMngtEndpoint> selectByEndpointID(String manageNodeId);

    int deleteByManagerNode(String manageNodeId);
}