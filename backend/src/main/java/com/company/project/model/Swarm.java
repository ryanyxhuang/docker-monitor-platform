package com.company.project.model;

import java.util.ArrayList;
import java.util.List;

public class Swarm {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column swarm.id
     *
     * @mbg.generated Mon Jun 03 15:52:31 CST 2019
     */
    private String id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column swarm.prom_port
     *
     * @mbg.generated Mon Jun 03 15:52:31 CST 2019
     */
    private String promPort;

    private ArrayList managerList;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column swarm.id
     *
     * @return the value of swarm.id
     *
     * @mbg.generated Mon Jun 03 15:52:31 CST 2019
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column swarm.id
     *
     * @param id the value for swarm.id
     *
     * @mbg.generated Mon Jun 03 15:52:31 CST 2019
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column swarm.prom_port
     *
     * @return the value of swarm.prom_port
     *
     * @mbg.generated Mon Jun 03 15:52:31 CST 2019
     */
    public String getPromPort() {
        return promPort;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column swarm.prom_port
     *
     * @param promPort the value for swarm.prom_port
     *
     * @mbg.generated Mon Jun 03 15:52:31 CST 2019
     */
    public void setPromPort(String promPort) {
        this.promPort = promPort;
    }


    public ArrayList getManagerList() {
        return managerList;
    }

    public void setManagerList(ArrayList list) {
        managerList = list;
    }
}