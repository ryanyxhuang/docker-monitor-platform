package com.company.project.service.impl;

import com.company.project.dao.EndpointMapper;
import com.company.project.model.Endpoint;
import org.springframework.stereotype.Service;
import com.company.project.service.EndpointService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import javax.annotation.Resource;

@Service
@Transactional
public class EndpointServiceImpl implements EndpointService {
    @Resource
    private EndpointMapper endpointMapper;

	@Override
	public int deleteById(String id) {
		return endpointMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int save(Endpoint record) {
		return endpointMapper.insert(record);
	}

	@Override
	public Endpoint findById(String id) {
		return endpointMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<Endpoint> findAll() {
		return endpointMapper.selectAll();
	}

	@Override
	public int update(Endpoint record) {
		return endpointMapper.updateByPrimaryKey(record);
	}
}
