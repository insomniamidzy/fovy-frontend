import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from '@emotion/styled';

// 樣式定義
const StyledNode = styled.div`
  padding: 16px;
  border-radius: 8px;
  display: inline-block;
  border: 2px solid #1976d2;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const SkillBadge = ({ project }) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6">{project.title}</Typography>
    <Typography variant="body2" color="text.secondary">
      難度: {project.difficulty}
    </Typography>
    <Typography variant="body2">
      完成日期: {project.completionDate}
    </Typography>
    <Box mt={1}>
      <Typography variant="subtitle2">使用技能:</Typography>
      {project.skills.map((skill, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            m: 0.5,
            p: 0.5,
            bgcolor: 'primary.light',
            borderRadius: 1,
            color: 'white',
            display: 'inline-block',
          }}
        >
          {skill}
        </Box>
      ))}
    </Box>
  </Paper>
);

const SkillLearning = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillTreeData = {
    name: '技能樹',
    children: [
      {
        name: 'UI 設計',
        level: '初學者',
        children: [
          {
            name: '登入頁面設計',
            project: {
              title: 'UI 登入畫面設計',
              description: '使用 wireframe → Figma prototype',
              skills: ['UX Flow', 'UI 元件設計', 'Prototype'],
              difficulty: '初級',
              completionDate: '2025-04-01',
            },
          },
        ],
      },
      {
        name: '前端開發',
        level: '中階',
        children: [
          {
            name: 'React 組件開發',
            project: {
              title: '可重用組件庫建立',
              description: '建立完整的 UI 組件系統',
              skills: ['React', 'TypeScript', 'Styled Components'],
              difficulty: '中級',
              completionDate: '2025-03-15',
            },
          },
        ],
      },
    ],
  };

  const renderTree = (node) => (
    <TreeNode
      label={
        <StyledNode onClick={() => setSelectedSkill(node)}>
          <Typography variant="subtitle1">{node.name}</Typography>
          {node.level && (
            <Typography variant="caption" color="text.secondary">
              {node.level}
            </Typography>
          )}
        </StyledNode>
      }
    >
      {node.children?.map((child, index) => (
        <React.Fragment key={index}>{renderTree(child)}</React.Fragment>
      ))}
    </TreeNode>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        學習成就展示
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              mb: 3, 
              minHeight: '60vh',
              overflow: 'auto'
            }}
          >
            <Tree
              lineWidth="2px"
              lineColor="#1976d2"
              lineBorderRadius="10px"
            >
              {renderTree(skillTreeData)}
            </Tree>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          {selectedSkill?.project && (
            <Box>
              <Typography variant="h6" gutterBottom>
                專案詳情
              </Typography>
              <SkillBadge project={selectedSkill.project} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SkillLearning;
