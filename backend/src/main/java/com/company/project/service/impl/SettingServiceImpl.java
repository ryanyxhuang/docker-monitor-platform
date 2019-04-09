package com.company.project.service.impl;

import com.company.project.dao.SettingMapper;
import com.company.project.model.Setting;
import org.springframework.stereotype.Service;
import com.company.project.service.SettingService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import javax.annotation.Resource;

@Service
@Transactional
public class SettingServiceImpl implements SettingService {
    @Resource
    private SettingMapper settingMapper;

	@Override
	public int deleteById(String id) {
		return settingMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int save(Setting record) {
		return settingMapper.insert(record);
	}

	@Override
	public Setting findById(String id) {
		return settingMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<Setting> findAll() {
		return settingMapper.selectAll();
	}

	@Override
	public int update(Setting record) {
		return settingMapper.updateByPrimaryKey(record);
	}
}
