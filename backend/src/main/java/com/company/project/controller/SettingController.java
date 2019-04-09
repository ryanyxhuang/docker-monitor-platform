package com.company.project.controller;

import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Setting;
import com.company.project.service.SettingService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/setting")
public class SettingController {
    @Resource
    private SettingService settingService;

    @PostMapping
    public Result add(@RequestBody Setting setting) {
        settingService.save(setting);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable String id) {
        settingService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody Setting setting) {
        settingService.update(setting);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        Setting setting = settingService.findById(id);
        return ResultGenerator.genSuccessResult(setting);
    }

    @GetMapping
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        List<Setting> list = settingService.findAll();
        return ResultGenerator.genSuccessResult(list);
    }
}
