import "reflect-metadata";
import {Container} from "inversify";
import dataContainer from "../data/di/data-container.config";
import domainContainer from "../domain/di/domain-container.config";

const container = Container.merge(dataContainer, domainContainer);
export default container;
