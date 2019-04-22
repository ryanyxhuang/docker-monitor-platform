package com.company.project.controller;

import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Compose;
import com.company.project.service.ComposeService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/compose")
public class ComposeController {
    @Resource
    private ComposeService composeService;

    @PostMapping
    public Result add(@RequestBody Compose compose) {
        composeService.save(compose);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable String id) {
        composeService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody Compose compose) {
        composeService.update(compose);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        Compose compose = composeService.findById(id);
        return ResultGenerator.genSuccessResult(compose);
    }

    @GetMapping
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        List<Compose> list = composeService.findAll();
        return ResultGenerator.genSuccessResult(list);
    }
}
