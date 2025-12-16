'use client';

import { useState } from 'react';
import styles from './ProductTabs.module.css';

interface Spec {
  label: string;
  value: string;
}

interface MaintenanceItem {
  title: string;
  description: string;
}

interface ProductTabsProps {
  review: string;
  specs: Spec[];
  maintenance: MaintenanceItem[];
}

type TabType = 'review' | 'specs' | 'maintenance';

export default function ProductTabs({ review, specs, maintenance }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('review');

  const tabs = [
    { id: 'review' as TabType, label: 'レンズレビュー' },
    { id: 'specs' as TabType, label: '技術仕様' },
    { id: 'maintenance' as TabType, label: '整備内容' },
  ];

  return (
    <div className={styles.tabsWrapper}>
      {/* タブヘッダー */}
      <div className={styles.tabHeader} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      <div className={styles.tabContent}>
        {/* レンズレビュー */}
        {activeTab === 'review' && (
          <div
            role="tabpanel"
            id="panel-review"
            aria-labelledby="tab-review"
            className={styles.panel}
          >
            <div className={styles.reviewCard}>
              <div className={styles.reviewIcon}>📷</div>
              <p className="body">{review}</p>
              <p className="footnote secondary-text" style={{ marginTop: '16px' }}>
                — プロカメラマン（11年の撮影経験）
              </p>
            </div>
          </div>
        )}

        {/* 技術仕様 */}
        {activeTab === 'specs' && (
          <div
            role="tabpanel"
            id="panel-specs"
            aria-labelledby="tab-specs"
            className={styles.panel}
          >
            <div className={styles.specsTable}>
              {specs.map((spec, index) => (
                <div key={index} className={styles.specRow}>
                  <dt className="subheadline secondary-text">{spec.label}</dt>
                  <dd className="body">{spec.value}</dd>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 整備内容 */}
        {activeTab === 'maintenance' && (
          <div
            role="tabpanel"
            id="panel-maintenance"
            aria-labelledby="tab-maintenance"
            className={styles.panel}
          >
            <div className={styles.maintenanceList}>
              {maintenance.map((item, index) => (
                <div key={index} className={styles.maintenanceItem}>
                  <div className={styles.maintenanceNumber}>
                    <span className="caption-1">{index + 1}</span>
                  </div>
                  <div className={styles.maintenanceContent}>
                    <h3 className="headline">{item.title}</h3>
                    <p className="body secondary-text">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
