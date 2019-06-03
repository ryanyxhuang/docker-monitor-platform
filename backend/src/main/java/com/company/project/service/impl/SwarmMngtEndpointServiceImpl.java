package com.company.project.service.impl;

import com.company.project.dao.SwarmMngtEndpointMapper;
import com.company.project.model.SwarmMngtEndpoint;
import org.springframework.stereotype.Service;
import com.company.project.service.SwarmMngtEndpointService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import javax.annotation.Resource;

@Service
@Transactional
public class SwarmMngtEndpointServiceImpl implements SwarmMngtEndpointService {
    @Resource
    private SwarmMngtEndpointMapper swarmMngtEndpointMapper;

	@Override
	public int deleteById(String id) {
		return swarmMngtEndpointMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int save(SwarmMngtEndpoint record) {
		return swarmMngtEndpointMapper.insert(record);
	}

	@Override
	public SwarmMngtEndpoint findById(String id) {
		return swarmMngtEndpointMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<SwarmMngtEndpoint> findAll() {
		return swarmMngtEndpointMapper.selectAll();
	}

	@Override
	public int update(SwarmMngtEndpoint record) {
		return swarmMngtEndpointMapper.updateByPrimaryKey(record);
	}

	@Override
	public List<SwarmMngtEndpoint> findByEndpointID(String manageNodeId) {
		return swarmMngtEndpointMapper.selectByEndpointID(manageNodeId);
	}

	public int deleteByManagerNode(String managerNodeId) {
		return swarmMngtEndpointMapper.deleteByManagerNode(managerNodeId);
	}
}
