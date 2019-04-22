package com.company.project.service.impl;

import com.company.project.dao.ComposeMapper;
import com.company.project.model.Compose;
import org.springframework.stereotype.Service;
import com.company.project.service.ComposeService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import javax.annotation.Resource;

@Service
@Transactional
public class ComposeServiceImpl implements ComposeService {
    @Resource
    private ComposeMapper composeMapper;

	@Override
	public int deleteById(String id) {
		return composeMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int save(Compose record) {
		return composeMapper.insert(record);
	}

	@Override
	public Compose findById(String id) {
		return composeMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<Compose> findAll() {
		return composeMapper.selectAll();
	}

	@Override
	public int update(Compose record) {
		return composeMapper.updateByPrimaryKey(record);
	}
}
