package com.company.project.service;
import com.company.project.model.SwarmMngtEndpoint;
import com.company.project.core.Service;

import java.util.List;

public interface SwarmMngtEndpointService extends Service<SwarmMngtEndpoint> {
    public List<SwarmMngtEndpoint> findByEndpointID(String manageNodeId);

    public int deleteByManagerNode(String managerNodeId);
}
