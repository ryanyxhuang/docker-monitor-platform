package com.company.project.service.impl;

import com.company.project.dao.SwarmMapper;
import com.company.project.model.Swarm;
import org.springframework.stereotype.Service;
import com.company.project.service.SwarmService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import javax.annotation.Resource;

@Service
@Transactional
public class SwarmServiceImpl implements SwarmService {
    @Resource
    private SwarmMapper swarmMapper;

	@Override
	public int deleteById(String id) {
		return swarmMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int save(Swarm record) {
		return swarmMapper.insert(record);
	}

	@Override
	public Swarm findById(String id) {
		return swarmMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<Swarm> findAll() {
		return swarmMapper.selectAll();
	}

	@Override
	public int update(Swarm record) {
		return swarmMapper.updateByPrimaryKey(record);
	}
}
