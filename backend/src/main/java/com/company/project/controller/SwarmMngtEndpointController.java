package com.company.project.controller;

import com.company.project.core.RequestUtil;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.SwarmMngtEndpoint;
import com.company.project.service.SwarmMngtEndpointService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/swarm_mng_endpoint")
public class SwarmMngtEndpointController {
    @Resource
    private SwarmMngtEndpointService swarmMngtEndpointService;

    private RequestUtil requestUtil = new RequestUtil();

    @PostMapping
    public Result add(@RequestBody SwarmMngtEndpoint swarmMngtEndpoint) {
        swarmMngtEndpoint.setId(swarmMngtEndpoint.getSwarmId() + "_" + swarmMngtEndpoint.getManageNodeId());
        swarmMngtEndpointService.save(swarmMngtEndpoint);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable String id) {
        swarmMngtEndpointService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("")
    public Result deleteByManagerNode(@RequestBody(required = false) Map<String, Object> params) {
        String manageNodeId = requestUtil.getJsonAttr(params, "manageNodeId");
        swarmMngtEndpointService.deleteByManagerNode(manageNodeId);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody SwarmMngtEndpoint swarmMngtEndpoint) {
        swarmMngtEndpointService.update(swarmMngtEndpoint);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        SwarmMngtEndpoint swarmMngtEndpoint = swarmMngtEndpointService.findById(id);
        return ResultGenerator.genSuccessResult(swarmMngtEndpoint);
    }

    @GetMapping
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size, @RequestParam(defaultValue = "") String manageNodeId) {
        if (!manageNodeId.equals("")) {
            List<SwarmMngtEndpoint> list = swarmMngtEndpointService.findByEndpointID(manageNodeId);
            return ResultGenerator.genSuccessResult(list);
        }
        List<SwarmMngtEndpoint> list = swarmMngtEndpointService.findAll();
        return ResultGenerator.genSuccessResult(list);
    }
}
