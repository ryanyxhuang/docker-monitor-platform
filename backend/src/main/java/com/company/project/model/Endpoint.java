package com.company.project.model;

public class Endpoint {
    private String name;
    private String dockerUrl;
    private String promUrl;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDockerUrl() {
        return dockerUrl;
    }
    public void setDockerUrl(String dockerUrl) {
        this.dockerUrl = dockerUrl;
    }

    public String getPromUrl() {
        return promUrl;
    }
    public void setPromUrl(String promUrl) {
        this.promUrl = promUrl;
    }
}