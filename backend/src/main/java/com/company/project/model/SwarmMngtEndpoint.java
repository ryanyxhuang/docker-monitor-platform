package com.company.project.model;

public class SwarmMngtEndpoint {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column swarm_mngt_endpoint.id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    private String id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column swarm_mngt_endpoint.swarm_id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    private String swarmId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column swarm_mngt_endpoint.manage_node_id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    private String manageNodeId;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column swarm_mngt_endpoint.id
     *
     * @return the value of swarm_mngt_endpoint.id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column swarm_mngt_endpoint.id
     *
     * @param id the value for swarm_mngt_endpoint.id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column swarm_mngt_endpoint.swarm_id
     *
     * @return the value of swarm_mngt_endpoint.swarm_id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    public String getSwarmId() {
        return swarmId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column swarm_mngt_endpoint.swarm_id
     *
     * @param swarmId the value for swarm_mngt_endpoint.swarm_id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    public void setSwarmId(String swarmId) {
        this.swarmId = swarmId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column swarm_mngt_endpoint.manage_node_id
     *
     * @return the value of swarm_mngt_endpoint.manage_node_id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    public String getManageNodeId() {
        return manageNodeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column swarm_mngt_endpoint.manage_node_id
     *
     * @param manageNodeId the value for swarm_mngt_endpoint.manage_node_id
     *
     * @mbg.generated Mon Jun 03 16:44:32 CST 2019
     */
    public void setManageNodeId(String manageNodeId) {
        this.manageNodeId = manageNodeId;
    }
}