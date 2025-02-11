#!/bin/bash

mvn --batch-mode -f build/sbom/pom.xml versions:set versions:commit -DnewVersion=${1}
mvn --batch-mode versions:set versions:commit -DnewVersion=${1} -DprocessAllModules
