/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {
  ComponentType,
  createContext,
  useContext,
  ReactNode,
} from 'react';

import { CompoundEntityRef } from '@backstage/catalog-model';

import { useReaderState } from '../useReaderState';
import { useTechDocsReaderPage } from '../TechDocsReaderPage';

/**
 * Props for {@link Reader}
 *
 * @public
 */
export type ReaderProps = {
  entityRef: CompoundEntityRef;
  withSearch?: boolean;
  onReady?: () => void;
};

type TechDocsReaderValue = ReturnType<typeof useReaderState>;

const TechDocsReaderContext = createContext<TechDocsReaderValue>(
  {} as TechDocsReaderValue,
);

/**
 * Note: this hook is currently being exported so that we can rapidly
 * iterate on alternative <Reader /> implementations that extend core
 * functionality. There is no guarantee that this hook will continue to be
 * exported by the package in the future!
 *
 * todo: Make public or stop exporting (ctrl+f "altReaderExperiments")
 * @internal
 */

export const useTechDocsReader = () => useContext(TechDocsReaderContext);

type TechDocsReaderProviderRenderFunction = (
  value: TechDocsReaderValue,
) => JSX.Element;

type TechDocsReaderProviderProps = {
  children: TechDocsReaderProviderRenderFunction | ReactNode;
};

export const TechDocsReaderProvider = ({
  children,
}: TechDocsReaderProviderProps) => {
  const { path, entityName } = useTechDocsReaderPage();
  const { kind, namespace, name } = entityName;
  const value = useReaderState(kind, namespace, name, path);

  return (
    <TechDocsReaderContext.Provider value={value}>
      {children instanceof Function ? children(value) : children}
    </TechDocsReaderContext.Provider>
  );
};

/**
 * Note: this HOC is currently being exported so that we can rapidly
 * iterate on alternative <Reader /> implementations that extend core
 * functionality. There is no guarantee that this HOC will continue to be
 * exported by the package in the future!
 *
 * todo: Make public or stop exporting (ctrl+f "altReaderExperiments")
 * @internal
 */
export const withTechDocsReaderProvider =
  <T extends {}>(Component: ComponentType<T>) =>
  (props: T) =>
    (
      <TechDocsReaderProvider>
        <Component {...props} />
      </TechDocsReaderProvider>
    );
