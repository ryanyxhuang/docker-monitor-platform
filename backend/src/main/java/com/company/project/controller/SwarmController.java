package com.company.project.controller;

import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Swarm;
import com.company.project.model.SwarmMngtEndpoint;
import com.company.project.service.SwarmMngtEndpointService;
import com.company.project.service.SwarmService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/swarm")
public class SwarmController {

    @Resource
    private SwarmService swarmService;
    @Resource
    private SwarmMngtEndpointService swarmMngtEndpointService;

    @PostMapping
    public Result add(@RequestBody(required = false) Map<String, Object> params) {
        String id = null;
        String endpointId = null;
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            if (entry.getKey() == "id") {
                id = entry.getValue().toString();
            }
            if (entry.getKey() == "endpointId") {
                endpointId = entry.getValue().toString();
            }
        }

        Swarm swarm = new Swarm();
        swarm.setId(id);
        swarm.setPromPort("9090");
        SwarmMngtEndpoint swarmMngtEndpoint= new SwarmMngtEndpoint();
        swarmMngtEndpoint.setId(id+"_"+endpointId);
        swarmMngtEndpoint.setSwarmId(id);
        swarmMngtEndpoint.setManageNodeId(endpointId);
        swarmService.save(swarm);
        swarmMngtEndpointService.save(swarmMngtEndpoint);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable String id) {
        swarmService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody Swarm swarm) {
        swarmService.update(swarm);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        Swarm swarm = swarmService.findById(id);
        return ResultGenerator.genSuccessResult(swarm);
    }

    @GetMapping
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        List<Swarm> list = swarmService.findAll();
        for(Swarm swarm : list){
            ArrayList managerList = new ArrayList();
            List<SwarmMngtEndpoint> relations = swarmMngtEndpointService.findAll();
            for(SwarmMngtEndpoint relation : relations) {
                String a = relation.getSwarmId();
                String b = swarm.getId();
                if (relation.getSwarmId().equals(swarm.getId())) {
                    managerList.add(relation.getManageNodeId());
                }
            }
            swarm.setManagerList(managerList);
        }

        return ResultGenerator.genSuccessResult(list);
    }
}
