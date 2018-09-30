#!/bin/bash

export JAVA_HOME=/usr/java/jdk1.8.0_181-amd64
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/jre/lib:$JAVA_HOME/lib:$JAVA_HOME/lib/tools.jar
export TOMCAT_HOME=/opt/apache-tomcat-8.5.34
export CATALINA_HOME=/opt/apache-tomcat-8.5.34
export CLASSPATH=$CLASSPATH:$CATALINA_HOME/lib